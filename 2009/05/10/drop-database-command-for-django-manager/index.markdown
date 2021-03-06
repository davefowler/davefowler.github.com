<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>'drop' Database Command for Django Manager</title>
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
               <h1>'drop' Database Command for Django Manager</h1>
         </div>
         <p>The Django manager is a really handy tool.  I wrote earlier about making your own custom managers and there is a lot of other great documentation on it.</p>
<p>Django comes with a bunch of helpful management commands like 'flush', 'syncdb', 'test', etc.</p>
<p>I've created a generic 'drop' command as I felt it was missing.  I often found myself going into mysql to drop and re-create a database.  This is needed whenever you significantly change your models and need to start over.  The 'drop' command does that automatically using the database information in your settings file.</p>
<p>The following code is from <a href="http://dpaste.com/hold/42832/">'drop.py'</a></p>
<pre><code>from django.conf import settingsfrom django.conf import settings

from django.core.management.base import NoArgsCommand

class Command(NoArgsCommand):
 help = "Drop and re-create the database"
 def handle_noargs(self, **options):

 import MySQLdb

 print "Connecting..."
 db=MySQLdb.connect(host=settings.DATABASE_HOST or "localhost" ,user=settings.DATABASE_USER,
 passwd=settings.DATABASE_PASSWORD, port=int(settings.DATABASE_PORT or 3306))

 cursor = db.cursor()
 print "Dropping database %s" % settings.DATABASE_NAME
 cursor.execute("drop database %s; create database %s;" % (settings.DATABASE_NAME, settings.DATABASE_NAME))
 print "Dropped"
</code></pre>
<p>To install simply place this code in a file called 'drop.py' and add it to a management comands folder.  If you don't have a management command folder yet you simply need to create the following file structure in one of your app directories (MY-APP-DIR).</p>
<pre><code>MY-APP-DIR/
  management/
    __init__.py
    commands/
      __init__.py
&lt;strong&gt;      drop.py

&lt;/strong&gt;
</code></pre>
<p>Now, whenever you' need to whipe your database and start fresh you can simply run:</p>
<pre><code>./manage.py drop
</code></pre>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>