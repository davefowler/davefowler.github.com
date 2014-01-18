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
<body id="chess">
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
                           <p>'use strict';</p>
<p>/<em>
 * Copyright (c) 2011, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 </em>
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 <em>
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 </em>
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 <em>
 </em>----------------------------------------------------------------------------*/</p>
<p>var Chess = function(fen) {</p>
<p>/<em> jshint indent: false </em>/</p>
<p>var BLACK = 'b';
  var WHITE = 'w';</p>
<p>var EMPTY = -1;</p>
<p>var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';</p>
<p>var SYMBOLS = 'pnbrqkPNBRQK';</p>
<p>var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';</p>
<p>var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];</p>
<p>var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  };</p>
<p>var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14,  18, 33, 31,  14],
    b: [-17, -15,  17,  15],
    r: [-16,   1,  16,  -1],
    q: [-17, -16, -15,   1,  17, 16, 15,  -1],
    k: [-17, -16, -15,   1,  17, 16, 15,  -1]
  };</p>
<p>var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];</p>
<p>var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];</p>
<p>var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };</p>
<p>var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };</p>
<p>var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
  };</p>
<p>var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;</p>
<p>var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };</p>
<p>var ROOKS = {
    w: [{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h1, flag: BITS.KSIDE_CASTLE}],
    b: [{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
        {square: SQUARES.h8, flag: BITS.KSIDE_CASTLE}]
  };</p>
<p>var board = new Array(128);
  var kings = {w: EMPTY, b: EMPTY};
  var turn = WHITE;
  var castling = {w: 0, b: 0};
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};</p>
<p>/<em> if the user passes in a fen string, load it, else default to
   * starting position
   </em>/
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }</p>
<p>function clear() {
    board = new Array(128);
    kings = {w: EMPTY, b: EMPTY};
    turn = WHITE;
    castling = {w: 0, b: 0};
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    header = {};
    update_setup(generate_fen());
  }</p>
<p>function reset() {
    load(DEFAULT_POSITION);
  }</p>
<p>function load(fen) {
    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;
    var valid = SYMBOLS + '12345678/';</p>
<pre><code>if (!validate_fen(fen).valid) {
  return false;
}

clear();

for (var i = 0; i &lt; position.length; i++) {
  var piece = position.charAt(i);

  if (piece === '/') {
    square += 8;
  } else if (is_digit(piece)) {
    square += parseInt(piece, 10);
  } else {
    var color = (piece &lt; 'a') ? WHITE : BLACK;
    put({type: piece.toLowerCase(), color: color}, algebraic(square));
    square++;
  }
}

turn = tokens[1];

if (tokens[2].indexOf('K') &gt; -1) {
  castling.w |= BITS.KSIDE_CASTLE;
}
if (tokens[2].indexOf('Q') &gt; -1) {
  castling.w |= BITS.QSIDE_CASTLE;
}
if (tokens[2].indexOf('k') &gt; -1) {
  castling.b |= BITS.KSIDE_CASTLE;
}
if (tokens[2].indexOf('q') &gt; -1) {
  castling.b |= BITS.QSIDE_CASTLE;
}

ep_square = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
half_moves = parseInt(tokens[4], 10);
move_number = parseInt(tokens[5], 10);

update_setup(generate_fen());

return true;
</code></pre>
<p>}</p>
<p>function validate_fen(fen) {
    var errors = {
       0: 'No errors.',
       1: 'FEN string must contain six space-delimited fields.',
       2: '6th field (move number) must be a positive integer.',
       3: '5th field (half move counter) must be a non-negative integer.',
       4: '4th field (en-passant square) is invalid.',
       5: '3rd field (castling availability) is invalid.',
       6: '2nd field (side to move) is invalid.',
       7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
       8: '1st field (piece positions) is invalid [consecutive numbers].',
       9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
    };</p>
<pre><code>/* 1st criterion: 6 space-seperated fields? */
var tokens = fen.split(/\s+/);
if (tokens.length !== 6) {
  return {valid: false, error_number: 1, error: errors[1]};
}

/* 2nd criterion: move number field is a integer value &gt; 0? */
if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) &lt;= 0)) {
  return {valid: false, error_number: 2, error: errors[2]};
}

/* 3rd criterion: half move counter is an integer &gt;= 0? */
if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) &lt; 0)) {
  return {valid: false, error_number: 3, error: errors[3]};
}

/* 4th criterion: 4th field is a valid e.p.-string? */
if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
  return {valid: false, error_number: 4, error: errors[4]};
}

/* 5th criterion: 3th field is a valid castle-string? */
if( !/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
  return {valid: false, error_number: 5, error: errors[5]};
}

/* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
if (!/^(w|b)$/.test(tokens[1])) {
  return {valid: false, error_number: 6, error: errors[6]};
}

/* 7th criterion: 1st field contains 8 rows? */
var rows = tokens[0].split('/');
if (rows.length !== 8) {
  return {valid: false, error_number: 7, error: errors[7]};
}

/* 8th criterion: every row is valid? */
for (var i = 0; i &lt; rows.length; i++) {
  /* check for right sum of fields AND not two numbers in succession */
  var sum_fields = 0;
  var previous_was_number = false;

  for (var k = 0; k &lt; rows[i].length; k++) {
    if (!isNaN(rows[i][k])) {
      if (previous_was_number) {
        return {valid: false, error_number: 8, error: errors[8]};
      }
      sum_fields += parseInt(rows[i][k], 10);
      previous_was_number = true;
    } else {
      if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
        return {valid: false, error_number: 9, error: errors[9]};
      }
      sum_fields += 1;
      previous_was_number = false;
    }
  }
  if (sum_fields !== 8) {
    return {valid: false, error_number: 10, error: errors[10]};
  }
}

/* everything's okay! */
return {valid: true, error_number: 0, error: errors[0]};
</code></pre>
<p>}</p>
<p>function generate_fen() {
    var empty = 0;
    var fen = '';</p>
<pre><code>for (var i = SQUARES.a8; i &lt;= SQUARES.h1; i++) {
  if (board[i] == null) {
    empty++;
  } else {
    if (empty &gt; 0) {
      fen += empty;
      empty = 0;
    }
    var color = board[i].color;
    var piece = board[i].type;

    fen += (color === WHITE) ?
             piece.toUpperCase() : piece.toLowerCase();
  }

  if ((i + 1) &amp; 0x88) {
    if (empty &gt; 0) {
      fen += empty;
    }

    if (i !== SQUARES.h1) {
      fen += '/';
    }

    empty = 0;
    i += 8;
  }
}

var cflags = '';
if (castling[WHITE] &amp; BITS.KSIDE_CASTLE) { cflags += 'K'; }
if (castling[WHITE] &amp; BITS.QSIDE_CASTLE) { cflags += 'Q'; }
if (castling[BLACK] &amp; BITS.KSIDE_CASTLE) { cflags += 'k'; }
if (castling[BLACK] &amp; BITS.QSIDE_CASTLE) { cflags += 'q'; }

/* do we have an empty castling flag? */
cflags = cflags || '-';
var epflags = (ep_square === EMPTY) ? '-' : algebraic(ep_square);

return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
</code></pre>
<p>}</p>
<p>function set_header(args) {
    for (var i = 0; i &lt; args.length; i += 2) {
      if (typeof args[i] === 'string' &amp;&amp;
          typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }</p>
<p>/<em> called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   </em>/
  function update_setup(fen) {
    if (history.length &gt; 0) return;</p>
<pre><code>if (fen !== DEFAULT_POSITION) {
  header['SetUp'] = fen;
  header['FEN'] = '1';
} else {
  delete header['SetUp'];
  delete header['FEN'];
}
</code></pre>
<p>}</p>
<p>function get(square) {
    var piece = board[SQUARES[square]];
    return (piece) ? {type: piece.type, color: piece.color} : null;
  }</p>
<p>function put(piece, square) {
    /<em> check for valid piece object </em>/
    if (!('type' in piece &amp;&amp; 'color' in piece)) {
      return false;
    }</p>
<pre><code>/* check for piece */
if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
  return false;
}

/* check for valid square */
if (!(square in SQUARES)) {
  return false;
}

var sq = SQUARES[square];
board[sq] = {type: piece.type, color: piece.color};
if (piece.type === KING) {
  kings[piece.color] = sq;
}

update_setup(generate_fen());

return true;
</code></pre>
<p>}</p>
<p>function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece &amp;&amp; piece.type === KING) {
      kings[piece.color] = EMPTY;
    }</p>
<pre><code>update_setup(generate_fen());

return piece;
</code></pre>
<p>}</p>
<p>function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type
    };</p>
<pre><code>if (promotion) {
  move.flags |= BITS.PROMOTION;
  move.promotion = promotion;
}

if (board[to]) {
  move.captured = board[to].type;
} else if (flags &amp; BITS.EP_CAPTURE) {
    move.captured = PAWN;
}
return move;
</code></pre>
<p>}</p>
<p>function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /<em> if pawn promotion </em>/
      if (board[from].type === PAWN &amp;&amp;
         (rank(to) === RANK_8 || rank(to) === RANK_1)) {
          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
          for (var i = 0, len = pieces.length; i &lt; len; i++) {
            moves.push(build_move(board, from, to, flags, pieces[i]));
          }
      } else {
       moves.push(build_move(board, from, to, flags));
      }
    }</p>
<pre><code>var moves = [];
var us = turn;
var them = swap_color(us);
var second_rank = {b: RANK_7, w: RANK_2};

var first_sq = SQUARES.a8;
var last_sq = SQUARES.h1;
var single_square = false;

/* do we want legal moves? */
var legal = (typeof options !== 'undefined' &amp;&amp; 'legal' in options) ?
            options.legal : true;

/* are we generating moves for a single square? */
if (typeof options !== 'undefined' &amp;&amp; 'square' in options) {
  if (options.square in SQUARES) {
    first_sq = last_sq = SQUARES[options.square];
    single_square = true;
  } else {
    /* invalid square */
    return [];
  }
}

for (var i = first_sq; i &lt;= last_sq; i++) {
  /* did we run off the end of the board */
  if (i &amp; 0x88) { i += 7; continue; }

  var piece = board[i];
  if (piece == null || piece.color !== us) {
    continue;
  }

  if (piece.type === PAWN) {
    /* single square, non-capturing */
    var square = i + PAWN_OFFSETS[us][0];
    if (board[square] == null) {
        add_move(board, moves, i, square, BITS.NORMAL);

      /* double square */
      var square = i + PAWN_OFFSETS[us][1];
      if (second_rank[us] === rank(i) &amp;&amp; board[square] == null) {
        add_move(board, moves, i, square, BITS.BIG_PAWN);
      }
    }

    /* pawn captures */
    for (j = 2; j &lt; 4; j++) {
      var square = i + PAWN_OFFSETS[us][j];
      if (square &amp; 0x88) continue;

      if (board[square] != null &amp;&amp;
          board[square].color === them) {
          add_move(board, moves, i, square, BITS.CAPTURE);
      } else if (square === ep_square) {
          add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
      }
    }
  } else {
    for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j &lt; len; j++) {
      var offset = PIECE_OFFSETS[piece.type][j];
      var square = i;

      while (true) {
        square += offset;
        if (square &amp; 0x88) break;

        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL);
        } else {
          if (board[square].color === us) break;
          add_move(board, moves, i, square, BITS.CAPTURE);
          break;
        }

        /* break, if knight or king */
        if (piece.type === 'n' || piece.type === 'k') break;
      }
    }
  }
}

/* check for castling if: a) we're generating all moves, or b) we're doing
 * single square move generation on the king's square
 */
if ((!single_square) || last_sq === kings[us]) {
  /* king-side castling */
  if (castling[us] &amp; BITS.KSIDE_CASTLE) {
    var castling_from = kings[us];
    var castling_to = castling_from + 2;

    if (board[castling_from + 1] == null &amp;&amp;
        board[castling_to]       == null &amp;&amp;
        !attacked(them, kings[us]) &amp;&amp;
        !attacked(them, castling_from + 1) &amp;&amp;
        !attacked(them, castling_to)) {
      add_move(board, moves, kings[us] , castling_to,
               BITS.KSIDE_CASTLE);
    }
  }

  /* queen-side castling */
  if (castling[us] &amp; BITS.QSIDE_CASTLE) {
    var castling_from = kings[us];
    var castling_to = castling_from - 2;

    if (board[castling_from - 1] == null &amp;&amp;
        board[castling_from - 2] == null &amp;&amp;
        board[castling_from - 3] == null &amp;&amp;
        !attacked(them, kings[us]) &amp;&amp;
        !attacked(them, castling_from - 1) &amp;&amp;
        !attacked(them, castling_to)) {
      add_move(board, moves, kings[us], castling_to,
               BITS.QSIDE_CASTLE);
    }
  }
}

/* return all pseudo-legal moves (this includes moves that allow the king
 * to be captured)
 */
if (!legal) {
  return moves;
}

/* filter out illegal moves */
var legal_moves = [];
for (var i = 0, len = moves.length; i &lt; len; i++) {
  make_move(moves[i]);
  if (!king_attacked(us)) {
    legal_moves.push(moves[i]);
  }
  undo_move();
}

return legal_moves;
</code></pre>
<p>}</p>
<p>/<em> convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   </em>/
  function move_to_san(move) {
    var output = '';</p>
<pre><code>if (move.flags &amp; BITS.KSIDE_CASTLE) {
  output = 'O-O';
} else if (move.flags &amp; BITS.QSIDE_CASTLE) {
  output = 'O-O-O';
} else {
  var disambiguator = get_disambiguator(move);

  if (move.piece !== PAWN) {
    output += move.piece.toUpperCase() + disambiguator;
  }

  if (move.flags &amp; (BITS.CAPTURE | BITS.EP_CAPTURE)) {
    if (move.piece === PAWN) {
      output += algebraic(move.from)[0];
    }
    output += 'x';
  }

  output += algebraic(move.to);

  if (move.flags &amp; BITS.PROMOTION) {
    output += '=' + move.promotion.toUpperCase();
  }
}

make_move(move);
if (in_check()) {
  if (in_checkmate()) {
    output += '#';
  } else {
    output += '+';
  }
}
undo_move();

return output;
</code></pre>
<p>}</p>
<p>function attacked(color, square) {
    for (var i = SQUARES.a8; i &lt;= SQUARES.h1; i++) {
      /<em> did we run off the end of the board </em>/
      if (i &amp; 0x88) { i += 7; continue; }</p>
<pre><code>  /* if empty square or wrong color */
  if (board[i] == null || board[i].color !== color) continue;

  var piece = board[i];
  var difference = i - square;
  var index = difference + 119;

  if (ATTACKS[index] &amp; (1 &lt;&lt; SHIFTS[piece.type])) {
    if (piece.type === PAWN) {
      if (difference &gt; 0) {
        if (piece.color === WHITE) return true;
      } else {
        if (piece.color === BLACK) return true;
      }
      continue;
    }

    /* if the piece is a knight or a king */
    if (piece.type === 'n' || piece.type === 'k') return true;

    var offset = RAYS[index];
    var j = i + offset;

    var blocked = false;
    while (j !== square) {
      if (board[j] != null) { blocked = true; break; }
      j += offset;
    }

    if (!blocked) return true;
  }
}

return false;
</code></pre>
<p>}</p>
<p>function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }</p>
<p>function in_check() {
    return king_attacked(turn);
  }</p>
<p>function in_checkmate() {
    return in_check() &amp;&amp; generate_moves().length === 0;
  }</p>
<p>function in_stalemate() {
    return !in_check() &amp;&amp; generate_moves().length === 0;
  }</p>
<p>function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;</p>
<pre><code>for (var i = SQUARES.a8; i&lt;= SQUARES.h1; i++) {
  sq_color = (sq_color + 1) % 2;
  if (i &amp; 0x88) { i += 7; continue; }

  var piece = board[i];
  if (piece) {
    pieces[piece.type] = (piece.type in pieces) ?
                          pieces[piece.type] + 1 : 1;
    if (piece.type === BISHOP) {
      bishops.push(sq_color);
    }
    num_pieces++;
  }
}

/* k vs. k */
if (num_pieces === 2) { return true; }

/* k vs. kn .... or .... k vs. kb */
else if (num_pieces === 3 &amp;&amp; (pieces[BISHOP] === 1 ||
                             pieces[KNIGHT] === 1)) { return true; }

/* kb vs. kb where any number of bishops are all on the same color */
else if (num_pieces === pieces[BISHOP] + 2) {
  var sum = 0;
  var len = bishops.length;
  for (var i = 0; i &lt; len; i++) {
    sum += bishops[i];
  }
  if (sum === 0 || sum === len) { return true; }
}

return false;
</code></pre>
<p>}</p>
<p>function in_threefold_repetition() {
    /<em> TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     </em>/
    var moves = [];
    var positions = {};
    var repetition = false;</p>
<pre><code>while (true) {
  var move = undo_move();
  if (!move) break;
  moves.push(move);
}

while (true) {
  /* remove the last two fields in the FEN string, they're not needed
   * when checking for draw by rep */
  var fen = generate_fen().split(' ').slice(0,4).join(' ');

  /* has the position occurred three or move times */
  positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
  if (positions[fen] &gt;= 3) {
    repetition = true;
  }

  if (!moves.length) {
    break;
  }
  make_move(moves.pop());
}

return repetition;
</code></pre>
<p>}</p>
<p>function push(move) {
    history.push({
      move: move,
      kings: {b: kings.b, w: kings.w},
      turn: turn,
      castling: {b: castling.b, w: castling.w},
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number
    });
  }</p>
<p>function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);</p>
<pre><code>board[move.to] = board[move.from];
board[move.from] = null;

/* if ep capture, remove the captured pawn */
if (move.flags &amp; BITS.EP_CAPTURE) {
  if (turn === BLACK) {
    board[move.to - 16] = null;
  } else {
    board[move.to + 16] = null;
  }
}

/* if pawn promotion, replace with new piece */
if (move.flags &amp; BITS.PROMOTION) {
  board[move.to] = {type: move.promotion, color: us};
}

/* if we moved the king */
if (board[move.to].type === KING) {
  kings[board[move.to].color] = move.to;

  /* if we castled, move the rook next to the king */
  if (move.flags &amp; BITS.KSIDE_CASTLE) {
    var castling_to = move.to - 1;
    var castling_from = move.to + 1;
    board[castling_to] = board[castling_from];
    board[castling_from] = null;
  } else if (move.flags &amp; BITS.QSIDE_CASTLE) {
    var castling_to = move.to + 1;
    var castling_from = move.to - 2;
    board[castling_to] = board[castling_from];
    board[castling_from] = null;
  }

  /* turn off castling */
  castling[us] = '';
}

/* turn off castling if we move a rook */
if (castling[us]) {
  for (var i = 0, len = ROOKS[us].length; i &lt; len; i++) {
    if (move.from === ROOKS[us][i].square &amp;&amp;
        castling[us] &amp; ROOKS[us][i].flag) {
      castling[us] ^= ROOKS[us][i].flag;
      break;
    }
  }
}

/* turn off castling if we capture a rook */
if (castling[them]) {
  for (var i = 0, len = ROOKS[them].length; i &lt; len; i++) {
    if (move.to === ROOKS[them][i].square &amp;&amp;
        castling[them] &amp; ROOKS[them][i].flag) {
      castling[them] ^= ROOKS[them][i].flag;
      break;
    }
  }
}

/* if big pawn move, update the en passant square */
if (move.flags &amp; BITS.BIG_PAWN) {
  if (turn === 'b') {
    ep_square = move.to - 16;
  } else {
    ep_square = move.to + 16;
  }
} else {
  ep_square = EMPTY;
}

/* reset the 50 move counter if a pawn is moved or a piece is captured */
if (move.piece === PAWN) {
  half_moves = 0;
} else if (move.flags &amp; (BITS.CAPTURE | BITS.EP_CAPTURE)) {
  half_moves = 0;
} else {
  half_moves++;
}

if (turn === BLACK) {
  move_number++;
}
turn = swap_color(turn);
</code></pre>
<p>}</p>
<p>function undo_move() {
    var old = history.pop();
    if (old == null) { return null; }</p>
<pre><code>var move = old.move;
kings = old.kings;
turn = old.turn;
castling = old.castling;
ep_square = old.ep_square;
half_moves = old.half_moves;
move_number = old.move_number;

var us = turn;
var them = swap_color(turn);

board[move.from] = board[move.to];
board[move.from].type = move.piece;  // to undo any promotions
board[move.to] = null;

if (move.flags &amp; BITS.CAPTURE) {
  board[move.to] = {type: move.captured, color: them};
} else if (move.flags &amp; BITS.EP_CAPTURE) {
  var index;
  if (us === BLACK) {
    index = move.to - 16;
  } else {
    index = move.to + 16;
  }
  board[index] = {type: PAWN, color: them};
}


if (move.flags &amp; (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
  var castling_to, castling_from;
  if (move.flags &amp; BITS.KSIDE_CASTLE) {
    castling_to = move.to + 1;
    castling_from = move.to - 1;
  } else if (move.flags &amp; BITS.QSIDE_CASTLE) {
    castling_to = move.to - 2;
    castling_from = move.to + 1;
  }

  board[castling_to] = board[castling_from];
  board[castling_from] = null;
}

return move;
</code></pre>
<p>}</p>
<p>/<em> this function is used to uniquely identify ambiguous moves </em>/
  function get_disambiguator(move) {
    var moves = generate_moves();</p>
<pre><code>var from = move.from;
var to = move.to;
var piece = move.piece;

var ambiguities = 0;
var same_rank = 0;
var same_file = 0;

for (var i = 0, len = moves.length; i &lt; len; i++) {
  var ambig_from = moves[i].from;
  var ambig_to = moves[i].to;
  var ambig_piece = moves[i].piece;

  /* if a move of the same piece type ends on the same to square, we'll
   * need to add a disambiguator to the algebraic notation
   */
  if (piece === ambig_piece &amp;&amp; from !== ambig_from &amp;&amp; to === ambig_to) {
    ambiguities++;

    if (rank(from) === rank(ambig_from)) {
      same_rank++;
    }

    if (file(from) === file(ambig_from)) {
      same_file++;
    }
  }
}

if (ambiguities &gt; 0) {
  /* if there exists a similar moving piece on the same rank and file as
   * the move in question, use the square as the disambiguator
   */
  if (same_rank &gt; 0 &amp;&amp; same_file &gt; 0) {
    return algebraic(from);
  }
  /* if the moving piece rests on the same file, use the rank symbol as the
   * disambiguator
   */
  else if (same_file &gt; 0) {
    return algebraic(from).charAt(1);
  }
  /* else use the file symbol */
  else {
    return algebraic(from).charAt(0);
  }
}

return '';
</code></pre>
<p>}</p>
<p>function ascii() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i &lt;= SQUARES.h1; i++) {
      /<em> display the rank </em>/
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |';
      }</p>
<pre><code>  /* empty piece */
  if (board[i] == null) {
    s += ' . ';
  } else {
    var piece = board[i].type;
    var color = board[i].color;
    var symbol = (color === WHITE) ?
                 piece.toUpperCase() : piece.toLowerCase();
    s += ' ' + symbol + ' ';
  }

  if ((i + 1) &amp; 0x88) {
    s += '|\n';
    i += 8;
  }
}
s += '   +------------------------+\n';
s += '     a  b  c  d  e  f  g  h\n';

return s;
</code></pre>
<p>}</p>
<p>/<strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong>
   * UTILITY FUNCTIONS
   <strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong>*</strong>*/
  function rank(i) {
    return i &gt;&gt; 4;
  }</p>
<p>function file(i) {
    return i &amp; 15;
  }</p>
<p>function algebraic(i){
    var f = file(i), r = rank(i);
    return 'abcdefgh'.substring(f,f+1) + '87654321'.substring(r,r+1);
  }</p>
<p>function swap_color(c) {
    return c === WHITE ? BLACK : WHITE;
  }</p>
<p>function is_digit(c) {
    return '0123456789'.indexOf(c) !== -1;
  }</p>
<p>/<em> pretty = external move object </em>/
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move);
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);</p>
<pre><code>var flags = '';

for (var flag in BITS) {
  if (BITS[flag] &amp; move.flags) {
    flags += FLAGS[flag];
  }
}
move.flags = flags;

return move;
</code></pre>
<p>}</p>
<p>function clone(obj) {
    var dupe = (obj instanceof Array) ? [] : {};</p>
<pre><code>for (var property in obj) {
  if (typeof property === 'object') {
    dupe[property] = clone(obj[property]);
  } else {
    dupe[property] = obj[property];
  }
}

return dupe;
</code></pre>
<p>}</p>
<p>function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }</p>
<p>/<strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong>
   * DEBUGGING UTILITIES
   <strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong>*</strong>*/
  function perft(depth) {
    var moves = generate_moves({legal: false});
    var nodes = 0;
    var color = turn;</p>
<pre><code>for (var i = 0, len = moves.length; i &lt; len; i++) {
  make_move(moves[i]);
  if (!king_attacked(color)) {
    if (depth - 1 &gt; 0) {
      var child_nodes = perft(depth - 1);
      nodes += child_nodes;
    } else {
      nodes++;
    }
  }
  undo_move();
}

return nodes;
</code></pre>
<p>}</p>
<p>return {
    /<strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>**
     * PUBLIC CONSTANTS (is there a better way to do this?)
     </em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><strong><em>*</em></strong><em>/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function() {
                /</em> from the ECMA-262 spec (section 12.6.4):
                 * "The mechanics of enumerating the properties ... is
                 * implementation dependent"
                 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
                 * ordered correctly
                 */
                var keys = [];
                for (var i = SQUARES.a8; i &lt;= SQUARES.h1; i++) {
                  if (i &amp; 0x88) { i += 7; continue; }
                  keys.push(algebraic(i));
                }
                return keys;
              })(),
    FLAGS: FLAGS,</p>
<pre><code>/***************************************************************************
 * PUBLIC API
 **************************************************************************/
load: function(fen) {
  return load(fen);
},

reset: function() {
  return reset();
},

moves: function(options) {
  /* The internal representation of a chess move is in 0x88 format, and
   * not meant to be human-readable.  The code below converts the 0x88
   * square coordinates to algebraic coordinates.  It also prunes an
   * unnecessary move keys resulting from a verbose call.
   */

  var ugly_moves = generate_moves(options);
  var moves = [];

  for (var i = 0, len = ugly_moves.length; i &lt; len; i++) {

    /* does the user want a full move object (most likely not), or just
     * SAN
     */
    if (typeof options !== 'undefined' &amp;&amp; 'verbose' in options &amp;&amp;
        options.verbose) {
      moves.push(make_pretty(ugly_moves[i]));
    } else {
      moves.push(move_to_san(ugly_moves[i]));
    }
  }

  return moves;
},

in_check: function() {
  return in_check();
},

in_checkmate: function() {
  return in_checkmate();
},

in_stalemate: function() {
  return in_stalemate();
},

in_draw: function() {
  return half_moves &gt;= 100 ||
         in_stalemate() ||
         insufficient_material() ||
         in_threefold_repetition();
},

insufficient_material: function() {
  return insufficient_material();
},

in_threefold_repetition: function() {
  return in_threefold_repetition();
},

game_over: function() {
  return half_moves &gt;= 100 ||
         in_checkmate() ||
         in_stalemate() ||
         insufficient_material() ||
         in_threefold_repetition();
},

validate_fen: function(fen) {
  return validate_fen(fen);
},

fen: function() {
  return generate_fen();
},

pgn: function(options) {
  /* using the specification from http://www.chessclub.com/help/PGN-spec
   * example for html usage: .pgn({ max_width: 72, newline_char: "&lt;br /&gt;" })
   */
  var newline = (typeof options === 'object' &amp;&amp;
                 typeof options.newline_char === 'string') ?
                 options.newline_char : '\n';
  var max_width = (typeof options === 'object' &amp;&amp;
                   typeof options.max_width === 'number') ?
                   options.max_width : 0;
  var result = [];
  var header_exists = false;

  /* add the PGN header headerrmation */
  for (var i in header) {
    /* TODO: order of enumerated properties in header object is not
     * guaranteed, see ECMA-262 spec (section 12.6.4)
     */
    result.push('[' + i + ' \"' + header[i] + '\"]' + newline);
    header_exists = true;
  }

  if (header_exists &amp;&amp; history.length) {
    result.push(newline);
  }

  /* pop all of history onto reversed_history */
  var reversed_history = [];
  while (history.length &gt; 0) {
    reversed_history.push(undo_move());
  }

  var moves = [];
  var move_string = '';
  var pgn_move_number = 1;

  /* build the list of moves.  a move_string looks like: "3. e3 e6" */
  while (reversed_history.length &gt; 0) {
    var move = reversed_history.pop();

    /* if the position started with black to move, start PGN with 1. ... */
    if (pgn_move_number === 1 &amp;&amp; move.color === 'b') {
      move_string = '1. ...';
      pgn_move_number++;
    } else if (move.color === 'w') {
      /* store the previous generated move_string if we have one */
      if (move_string.length) {
        moves.push(move_string);
      }
      move_string = pgn_move_number + '.';
      pgn_move_number++;
    }

    move_string = move_string + ' ' + move_to_san(move);
    make_move(move);
  }

  /* are there any other leftover moves? */
  if (move_string.length) {
    moves.push(move_string);
  }

  /* is there a result? */
  if (typeof header.Result !== 'undefined') {
    moves.push(header.Result);
  }

  /* history should be back to what is was before we started generating PGN,
   * so join together moves
   */
  if (max_width === 0) {
    return result.join('') + moves.join(' ');
  }

  /* wrap the PGN output at max_width */
  var current_width = 0;
  for (var i = 0; i &lt; moves.length; i++) {
    /* if the current move will push past max_width */
    if (current_width + moves[i].length &gt; max_width &amp;&amp; i !== 0) {

      /* don't end the line with whitespace */
      if (result[result.length - 1] === ' ') {
        result.pop();
      }

      result.push(newline);
      current_width = 0;
    } else if (i !== 0) {
      result.push(' ');
      current_width++;
    }
    result.push(moves[i]);
    current_width += moves[i].length;
  }

  return result.join('');
},

load_pgn: function(pgn, options) {
  function mask(str) {
    return str.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  }

  /* convert a move from Standard Algebraic Notation (SAN) to 0x88
   * coordinates
  */
  function move_from_san(move) {
    var to, from, flags = BITS.NORMAL, promotion;
    var parse = move.match(/^([NBKRQ])?([abcdefgh12345678][12345678]?)?(x)?([abcdefgh][12345678])(=?[NBRQ])?/);
    if (move.slice(0, 5) === 'O-O-O') {
      from = kings[turn];
      to = from - 2;
      flags = BITS.QSIDE_CASTLE;
    } else if (move.slice(0, 3) === 'O-O') {
      from = kings[turn];
      to = from + 2;
      flags = BITS.KSIDE_CASTLE;
    } else if (parse &amp;&amp; parse[1]) {
      // regular moves
      var piece = parse[1].toLowerCase();
      if (parse[3]) {
        // capture
        flags = BITS.CAPTURE;
      }
      to = SQUARES[parse[4]];
      for (var j = 0, len = PIECE_OFFSETS[piece].length; j &lt; len; j++) {
        var offset = PIECE_OFFSETS[piece][j];
        var square = to;

        while (true) {
          square += offset;
          if (square &amp; 0x88) break;

          var b = board[square];
          if (b) {
            if (b.color === turn &amp;&amp; b.type === piece &amp;&amp; (!parse[2] || algebraic(square).indexOf(parse[2]) &gt;= 0)) {
              from = square;
            }
            break;
          }

          /* break, if knight or king */
          if (piece === 'n' || piece === 'k') break;
        }
      }
    } else if (parse) {
      // pawn move
      if (parse[3]) {
        // capture
        to = SQUARES[parse[4]];
        for (var j = 2; j &lt; 4; j++) {
          var square = to - PAWN_OFFSETS[turn][j];
          if (square &amp; 0x88) continue;

          if (board[square] != null &amp;&amp;
              board[square].color === turn &amp;&amp;
              algebraic(square)[0] === parse[2]) {
            from = square;
          }
        }
        if (board[to]) {
          flags = BITS.CAPTURE;
        } else {
          flags = BITS.EP_CAPTURE;
        }
      } else {
        // normal move
        to = SQUARES[move.slice(0,2)];
        var c = to - PAWN_OFFSETS[turn][0],
            b = board[c];
        if (b &amp;&amp; b.type === PAWN &amp;&amp; b.color === turn) {
          from = c;
        } else {
          c = to - PAWN_OFFSETS[turn][1];
          b = board[c];
          if (b &amp;&amp; b.type === PAWN &amp;&amp; b.color === turn) {
            from = c;
            flags = BITS.BIG_PAWN;
          }
        }
      }
      // promotion?
      if (parse[5]) {
        if(typeof parse[5][1] == 'undefined') {
          promotion = parse[5][0].toLowerCase();
        } else {
          promotion = parse[5][1].toLowerCase();
        }
      }
    }
    if (from &gt;=0 &amp;&amp; to &gt;=0 &amp;&amp; flags) {
      return build_move(board, from, to, flags, promotion);
    } else if (move.length &gt; 0) {
      /* alert(move); // error in PGN, or in parsing. */
    }
  }

  function get_move_obj(move) {
    return move_from_san(trim(move));
  }

  function has_keys(object) {
    var has_keys = false;
    for (var key in object) {
      has_keys = true;
    }
    return has_keys;
  }

  function parse_pgn_header(header, options) {
    var newline_char = (typeof options === 'object' &amp;&amp;
                        typeof options.newline_char === 'string') ?
                        options.newline_char : '\r?\n';
    var header_obj = {};
    var headers = header.split(newline_char);
    var key = '';
    var value = '';

    for (var i = 0; i &lt; headers.length; i++) {
      key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
      value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
      if (trim(key).length &gt; 0) {
        header_obj[key] = value;
      }
    }

    return header_obj;
  }

  var newline_char = (typeof options === 'object' &amp;&amp;
                      typeof options.newline_char === 'string') ?
                      options.newline_char : '\r?\n';
    var regex = new RegExp('^(\\[(.|' + mask(newline_char) + ')*\\])' +
                           '(' + mask(newline_char) + ')*' +
                           '1.(' + mask(newline_char) + '|.)*$', 'g');

  /* get header part of the PGN file */
  var header_string = pgn.replace(regex, '$1');

  /* no info part given, begins with moves */
  if (header_string[0] !== '[') {
    header_string = '';
  }

 reset();

  /* parse PGN header */
  var headers = parse_pgn_header(header_string, options);
  for (var key in headers) {
    set_header([key, headers[key]]);
  }

  /* delete header to get the moves */
  var ms = pgn.replace(header_string, '').replace(new RegExp(mask(newline_char), 'g'), ' ');

  /* delete comments */
  ms = ms.replace(/(\{[^}]+\})+?/g, '');

  /* delete move numbers */
  ms = ms.replace(/\d+\./g, '');


  /* trim and get array of moves */
  var moves = trim(ms).split(new RegExp(/\s+/));

  /* delete empty entries */
  moves = moves.join(',').replace(/,,+/g, ',').split(',');
  var move = '';

  for (var half_move = 0; half_move &lt; moves.length - 1; half_move++) {
    move = get_move_obj(moves[half_move]);

    /* move not possible! (don't clear the board to examine to show the
     * latest valid position)
     */
    if (move == null) {
      return false;
    } else {
      make_move(move);
    }
  }

  /* examine last move */
  move = moves[moves.length - 1];
  if (POSSIBLE_RESULTS.indexOf(move) &gt; -1) {
    if (has_keys(header) &amp;&amp; typeof header.Result === 'undefined') {
      set_header(['Result', move]);
    }
  }
  else {
    move = get_move_obj(move);
    if (move == null) {
      return false;
    } else {
      make_move(move);
    }
  }
  return true;
},

header: function() {
  return set_header(arguments);
},

ascii: function() {
  return ascii();
},

turn: function() {
  return turn;
},

move: function(move) {
  /* The move function can be called with in the following parameters:
   *
   * .move('Nxb7')      &lt;- where 'move' is a case-sensitive SAN string
   *
   * .move({ from: 'h7', &lt;- where the 'move' is a move object (additional
   *         to :'h8',      fields are ignored)
   *         promotion: 'q',
   *      })
   */
  var move_obj = null;
  var moves = generate_moves();

  if (typeof move === 'string') {
    /* convert the move string to a move object */
    for (var i = 0, len = moves.length; i &lt; len; i++) {
      if (move === move_to_san(moves[i])) {
        move_obj = moves[i];
        break;
      }
    }
  } else if (typeof move === 'object') {
    /* convert the pretty move object to an ugly move object */
    for (var i = 0, len = moves.length; i &lt; len; i++) {
      if (move.from === algebraic(moves[i].from) &amp;&amp;
          move.to === algebraic(moves[i].to) &amp;&amp;
          (!('promotion' in moves[i]) ||
          move.promotion === moves[i].promotion)) {
        move_obj = moves[i];
        break;
      }
    }
  }

  /* failed to find move */
  if (!move_obj) {
    return null;
  }

  /* need to make a copy of move because we can't generate SAN after the
   * move is made
   */
  var pretty_move = make_pretty(move_obj);

  make_move(move_obj);

  return pretty_move;
},

undo: function() {
  var move = undo_move();
  return (move) ? make_pretty(move) : null;
},

clear: function() {
  return clear();
},

put: function(piece, square) {
  return put(piece, square);
},

get: function(square) {
  return get(square);
},

remove: function(square) {
  return remove(square);
},

perft: function(depth) {
  return perft(depth);
},

square_color: function(square) {
  if (square in SQUARES) {
    var sq_0x88 = SQUARES[square];
    return ((rank(sq_0x88) + file(sq_0x88)) % 2 === 0) ? 'light' : 'dark';
  }

  return null;
},

history: function(options) {
  var reversed_history = [];
  var move_history = [];
  var verbose = (typeof options !== 'undefined' &amp;&amp; 'verbose' in options &amp;&amp;
                 options.verbose);

  while (history.length &gt; 0) {
    reversed_history.push(undo_move());
  }

  while (reversed_history.length &gt; 0) {
    var move = reversed_history.pop();
    if (verbose) {
      move_history.push(make_pretty(move));
    } else {
      move_history.push(move_to_san(move));
    }
    make_move(move);
  }

  return move_history;
}
</code></pre>
<p>};
};</p>
<p>/<em> export Chess object if using node or any other CommonJS compatible
 * environment </em>/
if (typeof exports !== 'undefined') exports.Chess = Chess;</p>                           </article>
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