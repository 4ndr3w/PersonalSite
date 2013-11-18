<?php
require_once("markdown.php");
$basedir = "posts";

$posts = explode("\n", file_get_contents($basedir."/posts.list"));
$blog = array();

foreach ($posts as $post)

?>