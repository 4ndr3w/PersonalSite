---
title: "New Website"
date: "2017-08-10"
---

As I've been working on my summer projects, I wanted to get back into documenting them online. I wanted something that had markdown support and was simpler than WordPress. 

<!--more-->

### Caddy

[Caddy](https://caddyserver.com/) is a HTTP/HTTPS server that integrates with Let's Encrypt. My first attempts at building this site were through Caddy's built-in markdown renderer. Caddy supports rendering markdown content inside a Go template. Caddy exposes several functions inside the templates, but unfortunately does not provide a way to list files within a subdirectory. As seen in the Caddy blog example, all the markdown files are within the same directory as the index "list" page.

These issues proved too restrictive for me to build the entire site on Caddy's build-in markdown support. However, I still use Caddy as a frontend webserver for serving this site - its built-in Let's Encrypt support is just too easy.

### Hugo

Still wanting to avoid the complexity of a big CMS like WordPress, I began looking into static website generators. Since I was already comfortable with Go templates from my Caddy endeavor, I started using [Hugo](https://gohugo.io/).

After putting together a minimalist theme and writing this post, I'm pretty satisfied with Hugo. After I setup continuous integration the workflow for posting will be just as easy as with WordPress, except I'll be committing Markdown to git instead of using an online WYSIWYG editor.

#### Check back later for more posts about my summer projects!