<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Uninstalling the easy_install(ed)</title>
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
               <h1>Uninstalling the easy_install(ed)</h1>
         </div>
         <p>Today I was switching from the Python Cheese Shop's version of the Twisted Web Framework to the trunk version.  I'd previously installed Twisted with the handy</p>
<pre><code>easy_install PackageName
</code></pre>
<p>Worked great!  Unfortunately its not so obvious on how to uninstall...  After some research I <a href="http://peak.telecommunity.com/DevCenter/EasyInstall#uninstalling-packages">found it</a> and am sharing it here so I wont' forget.</p>
<p>Simply use easy_install with the -m option</p>
<pre><code>easy_install -m PackageName
</code></pre>
<p>Which will remove the installed dependencies.  Then you can delete the PackageName.egg file that easy_install left behind.  You may have to do some "locate"ing to find where it put the package as its different on every system.</p>
<p>Another hint is that easy_install creates a file easy-install.pth in your site-packages directory.  That file lists the path to the various eggs you've installed with easy_install.  In some cases you may simply be able to delete the path of your package in that file.</p>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>