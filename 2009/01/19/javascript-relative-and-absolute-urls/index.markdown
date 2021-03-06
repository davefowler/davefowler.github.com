<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Javascript Relative and Absolute URLs</title>
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
               <h1>Javascript Relative and Absolute URLs</h1>
         </div>
         <p>I recently discovered a small oddity in javascript link elements.  Simply stated, if you access the 'href' attribute using getAttribute('href') the result will be different than accessing it with simply 'href'.<br />
</p>
<p>The getAttribute will return the relative link, where the direct call will return the absolute. </p>
<p>Here's the test:</p>
<pre><code>&lt;html&gt;
  &lt;body &gt;
    &lt;a href="/relative/link" id='rellink'&gt;
      Relative Link&lt;/a&gt;
    &lt;div id='answer1'&gt;&lt;/div&gt;
    &lt;div id='answer2'&gt;&lt;/div&gt;
    &lt;script type='text/javascript'&gt;
      var link, a1,a2;
      link = document.getElementById('rellink');
      a1 = document.getElementById('answer1');
      a2 = document.getElementById('answer2');
      a1.innerHTML =  "getAttribute('href'): "
      + link.getAttribute('href');
      a2.innerHTML = "href: " + link.href;
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>and the resulting page show:</p>
<pre><code>&lt;a href="///relative/link" id="rellink"&gt;Relative Link
&lt;/a&gt;&lt;span style="font-family:Georgia;line-height:19px;white-space:normal;"&gt;getAttribute('href'): /relative/link

href: http://localhost/relative/link
 &lt;/span&gt;
</code></pre>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>