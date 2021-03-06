<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Starting Out With Comet (Orbited) Part 2 - Installation and STOMP</title>
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
               <h1>Starting Out With Comet (Orbited) Part 2 - Installation and STOMP</h1>
         </div>
         <p>In this part of the tutorial we will install and setup the server side of a Comet installation using the Orbited implementation.  We'll also be using the MorbitQ STOMP server to handle message passing and we'll play around with STOMP/Comet setup using Orbited's STOMP Test demo.  If you have not read the <a href="http://thingsilearned.com/2009/06/09/starting-out-with-comet-orbited-part-1/">first blog post</a> in this series I advise you do so.  I will be assuming you have an understanding of those terms and concepts of the previous post for this tutorial.</p>
<p>Before we start I'd like to quote my source.  I've learned most of what I'm sharing from <a href="http://cometdaily.com/2008/10/10/scalable-real-time-web-architecture-part-2-a-live-graph-with-orbited-morbidq-and-jsio/">Michael Carter's Tutorial</a> and many hours of playing around.</p>
<h2>Installation</h2>
<p>We will need to install the latest version of Orbited and also some Stomp tools.  The stomp tools aren't required for this step but will be for anything else you want to do with comet so I've included them in the installation steps here as well.  Conveniently Orbited is setup in the Cheeseshop.  You need <a href="http://www.python.org/download/">python2.5+</a> and if you have not installed the <a href="http://peak.telecommunity.com/DevCenter/EasyInstall">python setup-tools</a> do so now.</p>
<p>Installation simply consists of the following commands.</p>
<pre><code>easy_install twisted
easy_install orbited
easy_install stompservice
easy_install simplejson
</code></pre>
<p>To test if it works enter your python shell and test importing the libraries.  The following should load without any errors</p>
<p>$ python</p>
<blockquote>
<blockquote>
<blockquote>
<p>import twisted
import orbited
import stompservice
import simplejson</p>
</blockquote>
</blockquote>
</blockquote>
<p>If you have any troubles there is more info on the <a href="http://www.orbited.org/wiki/Installation">Orbited Installation Guide</a>.</p>
<h2>Configuration</h2>
<p>Orbited is configured with a '.cfg' file. Lets call ours example.cfg.  Make a directory anywhere for your project and paste the following into example.cfg</p>
<pre><code>[global]
session.ping_interval = 300

[listen]
http://:9000
stomp://:61613

[access]
* -&gt; localhost:61613
</code></pre>
<p>Lets go through the different parts.</p>
<p>The ping interval is a number of seconds for the backend to wait before it pings the client.  We've got it set up for 5 minutes.  Good comet implementations have some sort of pinging system.  This is a necessary step as due to current HTTP protocols the client cannot tell if something has gone wrong on the server end.  It simply waits happily all day for some sort of response for the server.  But with a pinging system setup we can tell the client to refresh its connection if it hasn't heard from the server in the last 300 seconds, and the server will make sure to ping the client at least every 300 seconds, letting it know that the connection is still alive.</p>
<p>The listen parameters tell the orbited server which ports to listen to and who to proxy requests to.  In our configuration port 9000 will be serving static html files, and port 61613 will be a proxy for our STOMP server.</p>
<p>And finally, the access parameter gives permission to proxy to the stomp server.</p>
<h2>Lets Run It</h2>
<p>To run enter your project directory and type</p>
<p>orbited - -config example.cfg</p>
<p>It should look something like this:</p>
<p>06/24/09 21:05:24:651 INFO   orbited.start    proxy protocol active
06/24/09 21:05:24:511 INFO   orbited.start    Listening http@9000
06/24/09 21:05:24:525 INFO   orbited.start    Listening stomp@61613</p>
<h2>STOMP Test</h2>
<p>Orbited comes with a really nice STOMP demo that also serves as a nice tool for debugging your setup later.  We'll use it to play around with Comet and understand the concepts behind STOMP.</p>
<p>While your orbited server is running visit the following URL.</p>
<p>http://localhost:9000/static/demos/stomp/</p>
<p><img alt="cometwindow" src="http://thingsilearned.files.wordpress.com/2009/06/cometwindow1.png" />There are 3 important tools/rows we'll be using here: Connect, Subscribe and Send.</p>
<p>First click on "Connect" to connect to the orbited and stomp servers.  We're using MorbitQ has the stomp client, which doesn't deal with authentication, so any name and password will work.  Notice that the STOMP test shell will now say.</p>
<p>→ Transport openned
→ Connected as user guest</p>
<p>Second change the "destination" in the "Subscribe" row to be "/channel/1/" and click Subscribe.  You have now created and subscribed to a channel called "/channel/1/".</p>
<p>Next we'll send something to that channel using the Send tool.  Again change the destination to "/channel/1/" and type something into the message box replacing "hello".  In the image above I've chosen "comet is working!".  Now hit Send and notice that your message shows up in your STOMP shell!</p>
<p>Try sending to other destinations and notice that only messages sent to "/channel/1/" will show up in the stomp shell.  We can change that however by subscribing to additional channels.  Try subscribing to "/anotherchannel/" and then send it a message.  Notice that this setup can handle being subscribed to many different channels at once.</p>
<h2>The Real Power</h2>
<p>All of the things we've tried so far could have been fairly easily implemented with simple AJAX.  The real power of comet is that it can push information to the client without having to submit a request.  Also, the real power of STOMP is that it smoothly handles message passing between clients.  Lets demonstrate both of these now by opening up multiple browser windows all pointing to our STOMP Test.</p>
<p><img alt="stompmultiple" src="http://thingsilearned.files.wordpress.com/2009/06/stompmultiple.png" />Open up 3 windows and "Connect" them each to the server.  Now subscribe the second window to "/channel/1/", the third window to "/channel/2/" and the first window to both.</p>
<p>Once setup, using the first window send a message "Message to Channel 1" to "/channel/1/".  You'll notice that it not only showed up instantly in window 1 (where you submitted), but also in window 2 (where you did nothing)!  The STOMP server has passed the message all clients listening to "/channel/1/" and the Comet server has pushed it to the client without it having to poll for updates!</p>
<p>Now send a message to "/channel/2/" and notice that it shows up in windows 1 and 3, but not 2.</p>
<p>Play around with this setup more to become familiar.  Each window can subscribe to any number of channels, and each can send messages to any channel, whether it is subscribed to it or not.</p>
<h2>Whats Next</h2>
<p>We've now setup and tested a Comet implementation.  You can see its benefits and understand how it works with STOMP.  In the next example we'll work on the client side of the Comet implementation and write a python STOMP client to handle processing and sending the data on a comet server.</p>
<p>In the mean time you may want to look at the <a href="http://localhost:9000/static/demos/">other demo's</a> that came with Orbited or <a href="http://cometdaily.com/2008/10/10/scalable-real-time-web-architecture-part-2-a-live-graph-with-orbited-morbidq-and-jsio/">Michael's Demo</a>.</p>
<p><strong>Update:</strong> <a href="http://thingsilearned.com/2009/08/03/starting-out-with-comet-orbited-part-3-%e2%80%93-the-client/">Part 3 - The Client</a> is now available.</p>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>