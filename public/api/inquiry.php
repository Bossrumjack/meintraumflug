<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['customerName']) || empty($data['customerEmail'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Pflichtfelder fehlen']);
    exit;
}

function fill_template(string $file, array $vars): string {
    $html = file_get_contents(__DIR__ . '/' . $file);
    foreach ($vars as $k => $v) {
        $html = str_replace('{{' . $k . '}}', $v !== '' ? $v : '—', $html);
    }
    return $html;
}

function fmt_date(string $iso): string {
    if (!$iso) return 'Kein Wunschtermin angegeben';
    $ts = strtotime($iso . 'T00:00:00');
    if (!$ts) return $iso;
    $days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
    $months = ['','Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    return $days[date('w', $ts)] . ', ' . date('j', $ts) . '. ' . $months[(int)date('n', $ts)] . ' ' . date('Y', $ts);
}

$name     = htmlspecialchars($data['customerName'],   ENT_QUOTES, 'UTF-8');
$email    = filter_var($data['customerEmail'],          FILTER_SANITIZE_EMAIL);
$phone    = htmlspecialchars($data['customerPhone']   ?? '', ENT_QUOTES, 'UTF-8');
$title    = htmlspecialchars($data['flightTitle']     ?? '', ENT_QUOTES, 'UTF-8');
$dur      = htmlspecialchars($data['flightDuration']  ?? '', ENT_QUOTES, 'UTF-8');
$price    = htmlspecialchars($data['flightPrice']     ?? '', ENT_QUOTES, 'UTF-8');
$wishDate = fmt_date($data['wishDate'] ?? '');
$wishNote = htmlspecialchars($data['wishNote']        ?? '', ENT_QUOTES, 'UTF-8');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

$from    = 'meintraumflug <noreply@meintraumflug.de>';
$notify  = 'info@meintraumflug.de';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $from,
    'X-Mailer: meintraumflug-php',
]);

$confirmHtml = fill_template('confirmation.html', [
    'name'           => $name,
    'flightTitle'    => $title,
    'flightDuration' => $dur,
    'flightPrice'    => $price,
    'wishDate'       => $wishDate,
    'wishNote'       => $wishNote ?: 'Keine Anmerkung',
]);

$notifyHtml = fill_template('notification.html', [
    'customerName'   => $name,
    'customerEmail'  => $email,
    'customerPhone'  => $phone ?: 'Nicht angegeben',
    'flightTitle'    => $title,
    'flightDuration' => $dur,
    'flightPrice'    => $price,
    'wishDate'       => $wishDate,
    'wishNote'       => $wishNote ?: 'Keine Anmerkung',
    'submittedAt'    => date('d.m.Y H:i'),
    'requestId'      => strtoupper(substr(md5(uniqid()), 0, 7)),
]);

$ok1 = mail($email,  'Ihre Anfrage ist eingegangen – meintraumflug', $confirmHtml, $headers);
$ok2 = mail($notify, '⚡ Neue Anfrage: ' . $title . ' – ' . $name,   $notifyHtml,  $headers);

if ($ok1 || $ok2) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
}
