<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Installing CSSTidy and Scons on OS X or Linux</title>
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
               <h1>Installing CSSTidy and Scons on OS X or Linux</h1>
         </div>
         <p>I'm setting up <a href="http://code.google.com/p/django-compress/">django-compress</a>, and incredibly helpful django tool for compressing media files.  By default it requires the installation of <a href="http://csstidy.sourceforge.net/">CSSTidy</a> which was not as smooth of a task as most.  Here are my notes.</p>
<p><strong>Installing Scons</strong></p>
<p>To install CSSTidy you have to have <a href="http://www.scons.org/">Scons</a> in order to install it.  Scons is similar to Make but uses python and probably has a ton of other differences as well.  The following will install scons.</p>
<pre><code>wget http://prdownloads.sourceforge.net/scons/scons-1.2.0.tar.gz
tar -xzvf scons-1.2.0.tar.gz
cd scons-1.2.0
sudo python setup.py install --standard-lib
</code></pre>
<p>I took me a short while to discover the need to use the --standard-lib flag.  If you do not scons is not installed in the python path and you will get the following error when trying to install csstidy</p>
<p><em>scons: *** No SConstruct file found.
File "/usr/local/lib/scons-1.2.0/SCons/Script/Main.py", line 826, in _main</em></p>
<p><strong>Install CSSTidy</strong></p>
<pre><code>wget http://downloads.sourceforge.net/csstidy/csstidy-source-1.4.zip?modtime=1184828155&amp;big_mirror=0
unzip csstidy-source-1.4.zip
scons
sudo cp release/csstidy/csstidy /usr/local/bin/
</code></pre>
<p>Note that the last command assumes /usr/local/bin is in your $PATH.  Change it if you would like to place it in another place.</p>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>