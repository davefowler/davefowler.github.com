<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Fixing Autocorrect Behavior in MS Word</title>
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
               <h1>Fixing Autocorrect Behavior in MS Word</h1>
         </div>
         <p>I'd like to discuss using macros to overcome a big limitation with Word's Autocorrect feature: the expansion of single-character autocorrect entries in words with apostrophes before the last character.</p>
<p>Suppose the letter "t" is set to expand into the word "the." This will work as it should in most cases, except when typing words like "don't."</p>
<p>Normally, autocorrect would expand this into "don'the." The same problem happens if entries are defined for any of the letters occurring at the end of words like "he's," "I'm," "we'd," and so on.</p>
<p>Thankfully, there's a workaround:       the autoexec macro. Here's what a stripped down version of mine looks like:</p>
<p>Sub AutoOpen()</p>
<p>' Forces correct Autocorrect behavior
With AutoCorrect.Entries
.Add Name:="'s", Value:="'s"
.Add Name:="'m", Value:="'m"
.Add Name:="'d", Value:="'d"
.Add Name:="'t", Value:="'t"</p>
<p>.Add Name:="'s.", Value:="'s."
.Add Name:="'m.", Value:="'m."
.Add Name:="'d.", Value:="'d."
.Add Name:="'t.", Value:="'t."
End With</p>
<p>End Sub</p>
<p>Throw this into your vb module, restart word, and now autocorrect should behave correctly.</p>
<p>--Vu</p>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>