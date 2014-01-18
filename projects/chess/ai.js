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
<body id="ai">
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
                           <p>var alpha = -999999999;
var beta  =  999999999;</p>
<p>/<em> Really dumb eval function:
 * 
 * f(p) = 200(K-K')
 *        + 9(Q-Q')
 *        + 5(R-R')
 *        + 3(B-B' + N-N')
 *        + 1(P-P')
 *        - 0.5(D-D' + S-S' + I-I')
 *        + 0.1(M-M') + ...
 </em><br />
 * KQRBNP = number of kings, queens, rooks, bishops, knights and pawns
 * D,S,I = doubled, blocked and isolated pawns
 * M = Mobility (the number of legal moves)
 * 
 */</p>
<p>var RANK = {};</p>
<p>_.each({k: -200, q: -9, r: -5, b: -3, n: -3, p: -1}, function(val, key) {
    RANK[key] = val;
    RANK[key.toUpperCase()] = val * -1;
});</p>
<p>// score the chess game based on the above algorithm.
function score(chess) {
    var pieces = <em>.toArray(fen_pieces(chess));
    var tally = </em>.tally(pieces);
    var s = 0;
    var turn = -1;
    if (chess.turn() == 'b')
    {
        turn = 1;//white just moved, evaluate from white's perspective
    }
    _.each(tally, function(val, p) {
        s = s + val*RANK[p];      <br />
    });
    return s * turn;
}</p>
<p>function fen_pieces(chess) {
    return chess.fen().split(' ')[0].replace(/\//g, '').replace(/\d/g, '');
}
function startAlphaBeta(tchess, depth)
{
    var best_score = -9999;
    var best_move = '';
    var moves = tchess.moves();
    for (var index = 0; index &lt; moves.length; index++)
    {
        var tempchess = new Chess(tchess.fen());
        tempchess.move(moves[index]);
        var move_score;
        if (tempchess.in_checkmate()){
            move_score = 9998;//last player to make move won
        } else{
            if (depth == 0)
            {
                move_score = score(tempchess);
            }
            else {
                move_score = -alphaBeta(tempchess, depth-1);
            }
        }
        if (move_score &gt; best_score){
            best_score = move_score;
            best_move = moves[index];
        }
    }
    return best_move;
}
function alphaBeta(tchess,depth) 
{
    var best_score = -9999;
    var moves = tchess.moves();
    for (var index = 0; index &lt; moves.length; index++)
    {
        var tempchess = new Chess(tchess.fen());
        tempchess.move(moves[index]);
        var move_score;
        if (tempchess.in_checkmate()){
            move_score = 9998;//last player to make move won
        } else{
            if (depth == 0)
            {
                move_score = score(tempchess);
            }
            else {
                move_score = -alphaBeta(tempchess, depth-1);
            }
        }
        if (move_score &gt; best_score){
            best_score = move_score;
        }
    }
    return best_score;
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