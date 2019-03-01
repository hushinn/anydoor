<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ title }}</title>
  <style>
    body {
      width: 80%;
      margin: 100px auto;
    }
    a {
      display: block;
      font-size: 18px;
      text-decoration: none;
      color: skyblue;
    }
  </style>
</head>
<body>
  {{#each files}}
    <a href={{../dir}}/{{this}}>{{this}}</a>
  {{/each}}
</body>
</html>
