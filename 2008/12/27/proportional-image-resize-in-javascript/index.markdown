<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Proportional Image Resize in JavaScript</title>
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
               <h1>Proportional Image Resize in JavaScript</h1>
         </div>
         <p><a href="http://Socialbrowse.com">Socialbrowse</a> currently shows summaries of shared links that have an ATOM or RSS feed.  The feeds come with images of all sizes and we have to change the height and width to fit within the alloted space.  CSS has max-width and max-height parameters but they have issues in IE and they don't keep original proportions of the image!  To resize and keep the proportions we use javascript.<br />
</p>
<p>This javascript resize function will do a proportional resize to keep the given <img> within the given max height and max width (maxh and maxw).  Feel free to copy and use it in any way you like.</p>
<blockquote>
<p>var resize = function(img, maxh, maxw) {
  var ratio = maxh/maxw;
  if (img.height/img.width &gt; ratio){
     // height is the problem
    if (img.height &gt; maxh){
      img.width = Math.round(img.width<em>(maxh/img.height));
      img.height = maxh;
    }
  } else {
    // width is the problem
    if (img.width &gt; maxh){
      img.height = Math.round(img.height</em>(maxw/img.width));
      img.width = maxw;
    }
  } 
};</p>
</blockquote>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>