<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title>Django Email Admins Using Different Outgoing Email Address</title>
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
               <h1>Django Email Admins Using Different Outgoing Email Address</h1>
         </div>
         <p><a href="http://socialbrowse.com">Socialbrowse</a> is deployed on <a href="http://aws.amazon.com/ec2/">EC2</a> using the <a href="http://djangoproject.com">Django</a> framework.  Unfortunately, as we learned the hard way, EC2 has some serious issues with both reverseDNS and email blocklists and is a horrible place to send emails from.  For this reason we use <a href="http://www.authsmtp.com/">AuthSMTP</a>, an email application that will has a much larger success rate for outgoing emails.  The one catch to this is that you pay (a small but significant amount) for each email that is sent out.<br />
</p>
<p>About 5 days into using AuthSMTP our database went down for 2 minutes and I received 4k error messages from Django!  This ate up my monthly AuthSMTP emails instantly and needless to say I was upset :).</p>
<p>To prevent this from happening again, I configured the error messages to be sent using a different email address.  Error emails always go to my gmail account, which does not block EC2 emails so I don't have to worry about the success rate and there for there is no need to go through AuthSMTP.</p>
<p>Here's the snippet to change your outgoing error message email address.<br />
</p>
<ol>
<li>
<p>Change the mail_admins function in django/core/mail.py to the following.<br />
</p>
</li>
<li>
<p>Edit the EMAIL_HOST_USER and EMAIL_HOST_PASSWORD variables to be your email and password. </p>
</li>
<li>
<p>Make sure <a href="http://www.postfix.org/">Postfix</a> or some other application that comes with <a href="http://www.sendmail.org/">sendmail</a> is installed</p>
</li>
<li>
<p>Restart your django server</p>
</li>
</ol>
<p>After those steps your error messages will come directly from your server and not go through AuthSMTP as your regular outgoing emails do.<br />
</p>
<pre><code>def mail_admins(subject, message, fail_silently=False):
    """Sends a message to the admins, as defined by the ADMINS setting."""
    EMAIL_HOST = 'smtp.gmail.com' #'127.0.0.1' 
    EMAIL_HOST_USER = 'YOUREMAIL@YOURDOMAIN.COM'
    EMAIL_HOST_PASSWORD = 'YOURPASSWORD'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True

    connection = SMTPConnection(EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_USE_TLS)
    EmailMessage(settings.EMAIL_SUBJECT_PREFIX + subject, message,
                 settings.SERVER_EMAIL, [a[1] for a in settings.ADMINS], connection=connection,
                 ).send(fail_silently=fail_silently)
</code></pre>         </article>
     </div>
</div>
          </section>
      </div>
      </div> <!--! end of #container -->
    
    <script type="text/javascript" src="/media/bootstrap/js/bootstrap.js"></script>
  
        </body>
</html>