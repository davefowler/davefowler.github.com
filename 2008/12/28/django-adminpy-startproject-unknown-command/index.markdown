<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Django-admin.py startproject > Unknown Command</title>
  <meta name="description" content="">
  <meta name="author" content="Dave Fowler">

  <!--  Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="">

    <link rel="shortcut icon" href="/favicon.ico">
  
    <link rel="stylesheet" href="/media/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/media/bootstrap/css/bootstrap-responsive.css">
  <style>
    .header h3 { color: #ccc; }
    .hero-unit { background-image:url('/media/images/hero.jpg'); }
  </style>
  
    
  </head>
<body id="index">
    <div class="container">
            <div id="main" role="main">
          <header class="banner clearfix">
          <div class='header'>
                <div class="row">
                  <div class="span5">
                    <h3>ThingsILearned <small>By Dave Fowler</small></h3>                  </div>
                  <div class="span3">
                                                            <nav >
    <ul class='breadcrumb'>
                <li>
            <a title="Home Page"
                class="button white"
                href="/">
                Home
            </a>
                              <span class="divider">/</span>        </li>        <li>
            <a title="Things I Learned"
                class="button white"
                href="/things">
                Things
            </a>
                              <span class="divider">/</span>        </li>        <li>
            <a title="About"
                class="button white"
                href="/about">
                About
            </a>
                                      </li>    </ul>
</nav>
                                        </ul>
                  </div>
                </div>
              </div>          </header>
          <section class="content">
          <div class="row">
     <div class="span8">
         <article class="thing">
         <div class='page-header'>
               <h1>Django-admin.py startproject > Unknown Command</h1>
         </div>
         <p>This is hardly worth a post but I'd found nothing on google for the fix and so I'm documenting it here for others.  In Django v 1.0 django-admin.py has smartly been altered to behave the same as ./manage.py.  It seems that this has effected the startproject command in the event that your DJANGO_SETTINGS_MODULE environment variable is already set.  If it is you'll get something like this:</p>
<blockquote>
<p>$ django-admin.py startproject myproject
<em>Unknown command: 'startproject'
Type 'django-admin.py help' for usage.</em></p>
</blockquote>
<p><em>There's an easy fix.  Just blank out your DJANGO_SETTINGS_MODULE variable and startproject will then be recognized.</em></p>
<blockquote></blockquote>
<blockquote>
<p>$ export DJANGO_SETTINGS_MODULE=""</p>
<p>$ django-admin.py startproject myproject</p>
</blockquote>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>