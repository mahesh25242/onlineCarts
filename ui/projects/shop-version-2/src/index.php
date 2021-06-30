<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?php echo ($data["siteName"] ?? '');?></title>
  <base href="<?php echo ($data["basePath"] ?? '');?>">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon-180x180.png">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="manifest" href="<?php echo ($data["shopKey"] ?? '');?>.webmanifest">
  <meta name="theme-color" content="<?php echo ($data["themeColor"] ?? '');?>">
  <meta name="shop-key" content="<?php echo ($data["shopKey"] ?? '');?>">
  <meta name="shop-name" content="<?php echo ($data["siteName"] ?? '');?>">
</head>
<body class="mat-typography">

<app-root></app-root>

  <noscript>Please enable JavaScript to continue using this application.</noscript>
</body>
</html>
