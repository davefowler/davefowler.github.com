<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="">
  <meta http-equiv="X-UA-Compatible" content="">

  <title></title>
  <meta name="description" content="">
  <meta name="author" content="dave">
  <link href="/atom.xml" rel="alternate" type="application/rss+xml" title="ThingsILearned by Dave Fowler" />

    <link rel="shortcut icon" href="/favicon.ico">
  
    <link rel="stylesheet" href="/media/css/bootstrap.min.css">
  <link rel="stylesheet" href="/media/css/pygments/github.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/media/css/til.css">
  
    
  </head>
<body id="game">
    <div class="container">
            <div id="main" role="main">
          <header class="banner clearfix">
          <div class='header'>
                <div class="row">
                  <div class="span8">
                    <h3 id="logo"><a href="/">ThingsILearned</a> <small><a href="/about">By Dave Fowler</a></small></h3>                  </div>
                  <div class="span4 text-right">
                                                            <nav >
    <ul class='breadcrumb'>
                <li>
            <a title="Things I Learned"
                class="button white"
                href="/">
                Things
            </a>
                              <span class="divider">/</span>        </li>        <li>
            <a title="About"
                class="button white"
                href="/about/">
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
     <div class="span10">
         <article class="thing">
          
         <div class='page-header'>
               <h1><small>by dave on </small></h1>
         </div>
                           <p>/<em> Chess 
 * By Dave Fowler
 </em>/</p>
<p>/<em> Note, all functions are tacked on to the instance instead of the class prototype because of the odd way chess.js does objects. </em>/
var chess = new Chess();</p>
<p>/<em> Utility Functions </em>/
<em>.mixin({
    // same as </em>.range but returns the alphabetic equivalent
    alphaRange: function(start, stop) {
        var alpha = "abcdefghijklmnopqrstuvwxyz";
        return <em>.map(</em>.range(start, stop), function(i) { return alpha[i] });
    },
    // return a string with the first instance of the character replaced
    removeFirst: function(str, c) {
        var i = str.indexOf(c);
        return str.slice(0, i) + str.slice(i+1, str.length);
    },
    // a boolean of whether a character is upper case
    isUpperCase: function(c) {
        return c == c.toUpperCase();
    },
    tally: function(arr) {
        var r = {};
        _.each(arr, function(c) { 
            r[c] = r[c] ? r[c] + 1 : 1;
        });
        return r;
    },
});</p>
<p>/<em> END Utility Functions </em>/</p>
<p>chess.symbols = {'w': 
                 {'k': '&#9812;', 
                  'q': '&#9813;',
                  'r': '&#9814;',
                  'b': '&#9815;',
                  'n': '&#9816;',
                  'p': '&#9817;',
                 },
                 'b':
                 {'k': '&#9818;',
                  'q': '&#9819;',
                  'r': '&#9820;',
                  'b': '&#9821;',
                  'n': '&#9822;',
                  'p': '&#9823;',
                 }
                }</p>
<p>chess.boardTemplate = "<table>&lt;% "
                    + "<em>.each(</em>.range(8, 0, -1), function(i) { "
                    +     "%&gt; <tr> &lt;%"
                    +     "<em>.each(</em>.alphaRange(0, 8), function(a) { "
                    +         "var piece = chess.get(a+i); %&gt;"
                    +         "<td class='square <%= chess.square_color(a+i) %>' data-square='&lt;%= a+i %&gt;' &gt; &lt;%"
                    +             "if (piece) { %&gt; "
                    +                 "<span class='piece' data-color='<%= piece.color %>' data-type='&lt;%= piece.type %&gt;' &gt;"
                    +                     "&lt;%= chess.symbols[piece.color][piece.type] %&gt;"
                    +                 "</span> &lt;% "
                    +             "} %&gt;"
                    +         "</td>&lt;% "
                    +     "}); "
                    +     "%&gt; </tr> &lt;%"
                    + "}); %&gt;"
                    + "</table>";
chess.renderBoard = function (node) {
    node = node || "#board";</p>
<pre><code>$(node).html(_.template(chess.boardTemplate));
$('.piece').draggable({
    'cursor': 'hand',
});

$('.square').droppable({
    accept: '.piece',
    hoverClass: 'hover',
    drop: function(event, ui) {
        var piece = ui.draggable;
        var origional_square = $(piece).parent().data('square');
        chess.move({from: origional_square, to: $(this).data('square'), promotion: $('#promotion option:selected').val() });
        chess.render(node);
    },
});
</code></pre>
<p>}</p>
<p>chess.render = function() {
    chess.renderBoard();
    $("#turn").html(chess.symbols[chess.turn()]['k']);
    $('#moves').html('<li>' + chess.pgn({newline_char: '</li><li>', 'max_width': 5}) + '</li>');
    var dead = chess.dead();
    $('#dead').html(
        '<li>' + <em>.reduce(</em>.map(['w', 'b'], function(color) {
            return _.reduce(dead[color], function(memo, piece) { 
                console.log('piece dead', memo, piece);
                return memo + " " + piece; }, "")</p>
<pre><code>    }), function (m, c) { return m + c + '&lt;/li&gt;&lt;li&gt;' }, '')
                + '&lt;/li&gt;');

if (chess.game_over()) {
    result = chess.turn() == 'b' ? 'White Wins!' : 'Black Wins!';
    if (chess.in_draw()) {
        result = "Draw";
    } else if (chess.in_stalemate()) {
        result = "Stalemate";
    } else if (chess.in_threefold_repetition()) {
        result = "Threefold Repetition";
    } else if (chess.insufficient_material()) {
        result = "Insufficient Material";
    }
    $("#turn").html(
        "&lt;span class='option-title gameover'&gt;Game Over - " + result + "&lt;/span&gt;"
    );
}

if (chess.turn() == 'b' &amp;&amp; $('#vs option:selected').val() == 'computer') {
    setTimeout(function() {
        var move = startAlphaBeta(chess, 1);
        chess.move(move);
        chess.render();
        }, 0);
}
</code></pre>
<p>}</p>
<p>// Return the fen characters for the peices that are dead
chess.dead_fen = function() {
    var dead = 'rnbqkbnrppppppppPPPPPPPPRNBQKBNR';</p>
<pre><code>var pieces = fen_pieces(chess);
_.each(_.toArray(pieces), function(piece) {
    dead = _.removeFirst(dead, piece);
});
return dead;
</code></pre>
<p>}</p>
<p>chess.dead = function() {
    dead = {'w': [], 'b': []};
    <em>.map(</em>.toArray(this.dead_fen()), function(piece) {
        var color = _.isUpperCase(piece) ? 'w' : 'b';
        dead[color].unshift(chess.symbols[color][piece.toLowerCase()]);
    });
    return dead;
}</p>                           </article>
     </div>
</div>

          </section>
      </div>
      </div> <!--! end of #container -->
          <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2253461-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>