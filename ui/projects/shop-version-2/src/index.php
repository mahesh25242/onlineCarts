<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?php echo ($data["siteName"] ?? '');?></title>
  <base href="<?php echo ($data["basePath"] ?? '');?>">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="<?php echo ($data["baseUrl"] ?? '');?>assets/shop/<?php echo ($data["shopKey"] ?? '');?>/general/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon-180x180.png">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="manifest" href="<?php echo ($data["shopKey"] ?? '');?>.webmanifest">
  <meta name="theme-color" content="<?php echo ($data["themeColor"] ?? '');?>">
  <meta name="shop-key" content="<?php echo ($data["shopKey"] ?? '');?>">
  <meta name="shop-name" content="<?php echo ($data["siteName"] ?? '');?>">

  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />

  <?php if (isset($data["shopKey"]) && $data["shopKey"] == '3d9f5a8eec71764c7c2df5a56496c8a1320dd921'){?>
    <script type='text/javascript'>
    window.smartlook||(function(d) {
      var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
      var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
      c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
      })(document);
      smartlook('init', 'df6649854dfe7af0a7af8d7dd14276614a58e67d');
  </script>

  <?php } ?>

  <script type="text/javascript">
    var botmanWidget = {
      frameEndpoint: '../widget.php'  ,
      chatServer: 'https://api.onlinecarts.in/v1/bot',
      placeholderText: 'Ask Me Something',

      introMessage: "✋ Hi! I'm from <?php echo ($data["siteName"] ?? '');?>, Please say hi to start chat.",
      title:'<?php echo ($data["siteName"] ?? '');?>',
      mainColor:'<?php echo ($data["themeColor"] ?? '');?>',
      aboutText:'powered by onlinecarts.in',
      aboutLink:'https://onlinecarts.in',
      headerTextColor: '#fff',
      shopId: '<?php echo ($data["shopKey"] ?? '');?>',
      bubbleAvatarUrl: 'https://onlinecarts.in/front/assets/bot.svg',
      bubbleBackground: 'none',
      userId: window.crypto.getRandomValues(new Uint32Array(1))[0]
    };
  </script>

</head>
<body class="mat-typography">

<app-root></app-root>

  <noscript>Please enable JavaScript to continue using this application.</noscript>
  <script src='https://api.onlinecarts.in/assets/botman/js/widget.js'></script>
</body>
</html>
