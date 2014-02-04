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
  
  <script type="text/javascript" src="//use.typekit.net/clg8egr.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

    
  </head>
<body id="underscore">
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
                           <p>//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.</p>
<p>(function() {</p>
<p>// Baseline setup
  // --------------</p>
<p>// Establish the root object, <code>window</code> in the browser, or <code>global</code> on the server.
  var root = this;</p>
<p>// Save the previous value of the <code>_</code> variable.
  var previousUnderscore = root._;</p>
<p>// Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};</p>
<p>// Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;</p>
<p>// Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;</p>
<p>// All <strong>ECMAScript 5</strong> native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;</p>
<p>// Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof <em>) return obj;
    if (!(this instanceof </em>)) return new _(obj);
    this._wrapped = obj;
  };</p>
<p>// Export the Underscore object for <strong>Node.js</strong>, with
  // backwards-compatibility for the old <code>require()</code> API. If we're in
  // the browser, add <code>_</code> as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' &amp;&amp; module.exports) {
      exports = module.exports = <em>;
    }
    exports.</em> = <em>;
  } else {
    root['</em>'] = _;
  }</p>
<p>// Current version.
  _.VERSION = '1.4.2';</p>
<p>// Collection Functions
  // --------------------</p>
<p>// The cornerstone, an <code>each</code> implementation, aka <code>forEach</code>.
  // Handles objects with the built-in <code>forEach</code>, arrays, and raw objects.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>forEach</code> if available.
  var each = <em>.each = </em>.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach &amp;&amp; obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i &lt; l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };</p>
<p>// Return the results of applying the iterator to each element.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>map</code> if available.
  <em>.map = </em>.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap &amp;&amp; obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };</p>
<p>// <strong>Reduce</strong> builds up a single result from a list of values, aka <code>inject</code>,
  // or <code>foldl</code>. Delegates to <strong>ECMAScript 5</strong>'s native <code>reduce</code> if available.
  <em>.reduce = </em>.foldl = <em>.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length &gt; 2;
    if (obj == null) obj = [];
    if (nativeReduce &amp;&amp; obj.reduce === nativeReduce) {
      if (context) iterator = </em>.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };</p>
<p>// The right-associative version of reduce, also known as <code>foldr</code>.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>reduceRight</code> if available.
  <em>.reduceRight = </em>.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length &gt; 2;
    if (obj == null) obj = [];
    if (nativeReduceRight &amp;&amp; obj.reduceRight === nativeReduceRight) {
      if (context) iterator = <em>.bind(iterator, context);
      return arguments.length &gt; 2 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = </em>.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };</p>
<p>// Return the first value which passes a truth test. Aliased as <code>detect</code>.
  <em>.find = </em>.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };</p>
<p>// Return all the elements that pass a truth test.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>filter</code> if available.
  // Aliased as <code>select</code>.
  <em>.filter = </em>.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter &amp;&amp; obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };</p>
<p>// Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };</p>
<p>// Determine whether all of the elements match a truth test.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>every</code> if available.
  // Aliased as <code>all</code>.
  <em>.every = </em>.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery &amp;&amp; obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result &amp;&amp; iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };</p>
<p>// Determine if at least one element in the object matches a truth test.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>some</code> if available.
  // Aliased as <code>any</code>.
  var any = <em>.some = </em>.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome &amp;&amp; obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };</p>
<p>// Determine if the array or object contains a given value (using <code>===</code>).
  // Aliased as <code>include</code>.
  <em>.contains = </em>.include = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf &amp;&amp; obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };</p>
<p>// Invoke a method (with arguments) on every item in a collection.
  <em>.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return </em>.map(obj, function(value) {
      return (_.isFunction(method) ? method : value[method]).apply(value, args);
    });
  };</p>
<p>// Convenience version of a common use case of <code>map</code>: fetching a property.
  <em>.pluck = function(obj, key) {
    return </em>.map(obj, function(value){ return value[key]; });
  };</p>
<p>// Convenience version of a common use case of <code>filter</code>: selecting only objects
  // with specific <code>key:value</code> pairs.
  <em>.where = function(obj, attrs) {
    if (</em>.isEmpty(attrs)) return [];
    return _.filter(obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };</p>
<p>// Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  <em>.max = function(obj, iterator, context) {
    if (!iterator &amp;&amp; </em>.isArray(obj) &amp;&amp; obj[0] === +obj[0] &amp;&amp; obj.length &lt; 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator &amp;&amp; _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed &gt;= result.computed &amp;&amp; (result = {value : value, computed : computed});
    });
    return result.value;
  };</p>
<p>// Return the minimum element (or element-based computation).
  <em>.min = function(obj, iterator, context) {
    if (!iterator &amp;&amp; </em>.isArray(obj) &amp;&amp; obj[0] === +obj[0] &amp;&amp; obj.length &lt; 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator &amp;&amp; _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed &lt; result.computed &amp;&amp; (result = {value : value, computed : computed});
    });
    return result.value;
  };</p>
<p>// Shuffle an array.
  <em>.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = </em>.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };</p>
<p>// An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };</p>
<p>// Sort the object's values by a criterion produced by an iterator.
  <em>.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return </em>.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a &gt; b || a === void 0) return 1;
        if (a &lt; b || b === void 0) return -1;
      }
      return left.index &lt; right.index ? -1 : 1;
    }), 'value');
  };</p>
<p>// An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };</p>
<p>// Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  <em>.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (</em>.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };</p>
<p>// Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  <em>.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      if (!</em>.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };</p>
<p>// Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  <em>.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? </em>.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low &lt; high) {
      var mid = (low + high) &gt;&gt;&gt; 1;
      iterator.call(context, array[mid]) &lt; value ? low = mid + 1 : high = mid;
    }
    return low;
  };</p>
<p>// Safely convert anything iterable into a real, live array.
  <em>.toArray = function(obj) {
    if (!obj) return [];
    if (obj.length === +obj.length) return slice.call(obj);
    return </em>.values(obj);
  };</p>
<p>// Return the number of elements in an object.
  <em>.size = function(obj) {
    return (obj.length === +obj.length) ? obj.length : </em>.keys(obj).length;
  };</p>
<p>// Array Functions
  // ---------------</p>
<p>// Get the first element of an array. Passing <strong>n</strong> will return the first N
  // values in the array. Aliased as <code>head</code> and <code>take</code>. The <strong>guard</strong> check
  // allows it to work with <code>_.map</code>.
  <em>.first = </em>.head = _.take = function(array, n, guard) {
    return (n != null) &amp;&amp; !guard ? slice.call(array, 0, n) : array[0];
  };</p>
<p>// Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing <strong>n</strong> will return all the values in
  // the array, excluding the last N. The <strong>guard</strong> check allows it to work with
  // <code>_.map</code>.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };</p>
<p>// Get the last element of an array. Passing <strong>n</strong> will return the last N
  // values in the array. The <strong>guard</strong> check allows it to work with <code>_.map</code>.
  _.last = function(array, n, guard) {
    if ((n != null) &amp;&amp; !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };</p>
<p>// Returns everything but the first entry of the array. Aliased as <code>tail</code> and <code>drop</code>.
  // Especially useful on the arguments object. Passing an <strong>n</strong> will return
  // the rest N values in the array. The <strong>guard</strong>
  // check allows it to work with <code>_.map</code>.
  <em>.rest = </em>.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };</p>
<p>// Trim out all falsy values from an array.
  <em>.compact = function(array) {
    return </em>.filter(array, function(value){ return !!value; });
  };</p>
<p>// Internal implementation of a recursive <code>flatten</code> function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };</p>
<p>// Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };</p>
<p>// Return a version of the array that does not contain the specified value(s).
  <em>.without = function(array) {
    return </em>.difference(array, slice.call(arguments, 1));
  };</p>
<p>// Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as <code>unique</code>.
  <em>.uniq = </em>.unique = function(array, isSorted, iterator, context) {
    var initial = iterator ? <em>.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !</em>.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };</p>
<p>// Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  <em>.union = function() {
    return </em>.uniq(concat.apply(ArrayProto, arguments));
  };</p>
<p>// Produce an array that contains every item shared between all the
  // passed-in arrays.
  <em>.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return </em>.filter(<em>.uniq(array), function(item) {
      return </em>.every(rest, function(other) {
        return _.indexOf(other, item) &gt;= 0;
      });
    });
  };</p>
<p>// Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  <em>.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return </em>.filter(array, function(value){ return !_.contains(rest, value); });
  };</p>
<p>// Zip together multiple lists into a single array -- elements that share
  // an index go together.
  <em>.zip = function() {
    var args = slice.call(arguments);
    var length = </em>.max(<em>.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i &lt; length; i++) {
      results[i] = </em>.pluck(args, "" + i);
    }
    return results;
  };</p>
<p>// Converts lists into objects. Pass either a single array of <code>[key, value]</code>
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, l = list.length; i &lt; l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };</p>
<p>// If the browser doesn't supply us with indexOf (I'm looking at you, <strong>MSIE</strong>),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>indexOf</code> if available.
  // If the array is large and already in sort order, pass <code>true</code>
  // for <strong>isSorted</strong> to use binary search.
  <em>.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted &lt; 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = </em>.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf &amp;&amp; array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i &lt; l; i++) if (array[i] === item) return i;
    return -1;
  };</p>
<p>// Delegates to <strong>ECMAScript 5</strong>'s native <code>lastIndexOf</code> if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf &amp;&amp; array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };</p>
<p>// Generate an integer Array containing an arithmetic progression. A port of
  // the native Python <code>range()</code> function. See
  // <a href="http://docs.python.org/library/functions.html#range">the Python documentation</a>.
  _.range = function(start, stop, step) {
    if (arguments.length &lt;= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;</p>
<pre><code>var len = Math.max(Math.ceil((stop - start) / step), 0);
var idx = 0;
var range = new Array(len);

while(idx &lt; len) {
  range[idx++] = start;
  start += step;
}

return range;
</code></pre>
<p>};</p>
<p>// Function (ahem) Functions
  // ------------------</p>
<p>// Reusable constructor function for prototype setting.
  var ctor = function(){};</p>
<p>// Create a function bound to a given object (assigning <code>this</code>, and arguments,
  // optionally). Binding with arguments is also known as <code>curry</code>.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>Function.bind</code> if available.
  // We check for <code>func.bind</code> first, to fail fast when <code>func</code> is undefined.
  <em>.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind &amp;&amp; nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!</em>.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };</p>
<p>// Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  <em>.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = </em>.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };</p>
<p>// Memoize an expensive function by storing its results.
  <em>.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = </em>.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };</p>
<p>// Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };</p>
<p>// Defers a function, scheduling it to run after the current call stack has
  // cleared.
  <em>.defer = function(func) {
    return </em>.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };</p>
<p>// Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  <em>.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = </em>.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) {
          result = func.apply(context, args);
        }
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        throttling = true;
        result = func.apply(context, args);
      }
      whenDone();
      return result;
    };
  };</p>
<p>// Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If <code>immediate</code> is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate &amp;&amp; !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };</p>
<p>// Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };</p>
<p>// Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };</p>
<p>// Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i &gt;= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };</p>
<p>// Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times &lt;= 0) return func();
    return function() {
      if (--times &lt; 1) {
        return func.apply(this, arguments);
      }
    };
  };</p>
<p>// Object Functions
  // ----------------</p>
<p>// Retrieve the names of an object's properties.
  // Delegates to <strong>ECMAScript 5</strong>'s native <code>Object.keys</code>
  <em>.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (</em>.has(obj, key)) keys[keys.length] = key;
    return keys;
  };</p>
<p>// Retrieve the values of an object's properties.
  <em>.values = function(obj) {
    var values = [];
    for (var key in obj) if (</em>.has(obj, key)) values.push(obj[key]);
    return values;
  };</p>
<p>// Convert an object into a list of <code>[key, value]</code> pairs.
  <em>.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (</em>.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };</p>
<p>// Invert the keys and values of an object. The values must be serializable.
  <em>.invert = function(obj) {
    var result = {};
    for (var key in obj) if (</em>.has(obj, key)) result[obj[key]] = key;
    return result;
  };</p>
<p>// Return a sorted list of the function names available on the object.
  // Aliased as <code>methods</code>
  <em>.functions = </em>.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };</p>
<p>// Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };</p>
<p>// Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };</p>
<p>// Return a copy of the object without the blacklisted properties.
  <em>.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!</em>.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };</p>
<p>// Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };</p>
<p>// Create a (shallow-cloned) duplicate of an object.
  <em>.clone = function(obj) {
    if (!</em>.isObject(obj)) return obj;
    return <em>.isArray(obj) ? obj.slice() : </em>.extend({}, obj);
  };</p>
<p>// Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };</p>
<p>// Internal recursive comparison function for <code>isEqual</code>.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. <code>0 === -0</code>, but they aren't identical.
    // See the Harmony <code>egal</code> proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because <code>null == undefined</code>.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof <em>) a = a._wrapped;
    if (b instanceof </em>) b = b.<em>wrapped;
    // Compare <code>/Class</code> names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, <code>"5"</code> is
        // equivalent to <code>new String("5")</code>.
        return a == String(b);
      case '[object Number]':
        // <code>NaN</code>s are equivalent, but non-reflexive. An <code>egal</code> comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of <code>NaN</code> are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &amp;&amp;
               a.global == b.global &amp;&amp;
               a.multiline == b.multiline &amp;&amp;
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation <code>JO</code>.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but <code>Object</code>s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor &amp;&amp; !(</em>.isFunction(aCtor) &amp;&amp; (aCtor instanceof aCtor) &amp;&amp;
                               <em>.isFunction(bCtor) &amp;&amp; (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (</em>.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = <em>.has(b, key) &amp;&amp; eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (</em>.has(b, key) &amp;&amp; !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };</p>
<p>// Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };</p>
<p>// Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  <em>.isEmpty = function(obj) {
    if (obj == null) return true;
    if (</em>.isArray(obj) || <em>.isString(obj)) return obj.length === 0;
    for (var key in obj) if (</em>.has(obj, key)) return false;
    return true;
  };</p>
<p>// Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj &amp;&amp; obj.nodeType === 1);
  };</p>
<p>// Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };</p>
<p>// Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };</p>
<p>// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });</p>
<p>// Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!<em>.isArguments(arguments)) {
    </em>.isArguments = function(obj) {
      return !!(obj &amp;&amp; _.has(obj, 'callee'));
    };
  }</p>
<p>// Optimize <code>isFunction</code> if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }</p>
<p>// Is a given object a finite number?
  <em>.isFinite = function(obj) {
    return </em>.isNumber(obj) &amp;&amp; isFinite(obj);
  };</p>
<p>// Is the given value <code>NaN</code>? (NaN is the only number which does not equal itself).
  <em>.isNaN = function(obj) {
    return </em>.isNumber(obj) &amp;&amp; obj != +obj;
  };</p>
<p>// Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };</p>
<p>// Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };</p>
<p>// Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };</p>
<p>// Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };</p>
<p>// Utility Functions
  // -----------------</p>
<p>// Run Underscore.js in <em>noConflict</em> mode, returning the <code>_</code> variable to its
  // previous owner. Returns a reference to the Underscore object.
  <em>.noConflict = function() {
    root.</em> = previousUnderscore;
    return this;
  };</p>
<p>// Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };</p>
<p>// Run a function <strong>n</strong> times.
  _.times = function(n, iterator, context) {
    for (var i = 0; i &lt; n; i++) iterator.call(context, i);
  };</p>
<p>// Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + (0 | Math.random() * (max - min + 1));
  };</p>
<p>// List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&amp;': '&amp;',
      '&lt;': '&lt;',
      '&gt;': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);</p>
<p>// Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + <em>.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + </em>.keys(entityMap.unescape).join('|') + ')', 'g')
  };</p>
<p>// Functions for escaping and unescaping strings to/from HTML interpolation.
  <em>.each(['escape', 'unescape'], function(method) {
    </em>[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });</p>
<p>// If the value of the named property is a function then invoke it;
  // otherwise, return it.
  <em>.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return </em>.isFunction(value) ? value.call(object) : value;
  };</p>
<p>// Add your own custom functions to the Underscore object.
  <em>.mixin = function(obj) {
    each(</em>.functions(obj), function(name){
      var func = <em>[name] = obj[name];
      </em>.prototype[name] = function() {
        var args = [this.<em>wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(</em>, args));
      };
    });
  };</p>
<p>// Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };</p>
<p>// By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /&lt;%([\s\S]+?)%&gt;/g,
    interpolate : /&lt;%=([\s\S]+?)%&gt;/g,
    escape      : /&lt;%-([\s\S]+?)%&gt;/g
  };</p>
<p>// When customizing <code>templateSettings</code>, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;</p>
<p>// Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\':     '\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };</p>
<p>var escaper = /\|'|\r|\n|\t|\u2028|\u2029/g;</p>
<p>// JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  <em>.template = function(text, data, settings) {
    settings = </em>.defaults({}, settings, _.templateSettings);</p>
<pre><code>// Combine delimiters into one regular expression via alternation.
var matcher = new RegExp([
  (settings.escape || noMatch).source,
  (settings.interpolate || noMatch).source,
  (settings.evaluate || noMatch).source
].join('|') + '|$', 'g');

// Compile the template source, escaping string literals appropriately.
var index = 0;
var source = "__p+='";
text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
  source += text.slice(index, offset)
    .replace(escaper, function(match) { return '\\' + escapes[match]; });
  source +=
    escape ? "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" :
    interpolate ? "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" :
    evaluate ? "';\n" + evaluate + "\n__p+='" : '';
  index = offset + match.length;
});
source += "';\n";

// If a variable is not specified, place data values in local scope.
if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

source = "var __t,__p='',__j=Array.prototype.join," +
  "print=function(){__p+=__j.call(arguments,'');};\n" +
  source + "return __p;\n";

try {
  var render = new Function(settings.variable || 'obj', '_', source);
} catch (e) {
  e.source = source;
  throw e;
}

if (data) return render(data, _);
var template = function(data) {
  return render.call(this, data, _);
};

// Provide the compiled function source as a convenience for precompilation.
template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

return template;
</code></pre>
<p>};</p>
<p>// Add a "chain" function, which will delegate to the wrapper.
  <em>.chain = function(obj) {
    return </em>(obj).chain();
  };</p>
<p>// OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.</p>
<p>// Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this.<em>chain ? </em>(obj).chain() : obj;
  };</p>
<p>// Add all of the Underscore functions to the wrapper object.
  <em>.mixin(</em>);</p>
<p>// Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') &amp;&amp; obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });</p>
<p>// Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });</p>
<p><em>.extend(</em>.prototype, {</p>
<pre><code>// Start chaining a wrapped Underscore object.
chain: function() {
  this._chain = true;
  return this;
},

// Extracts the result from a wrapped and chained object.
value: function() {
  return this._wrapped;
}
</code></pre>
<p>});</p>
<p>}).call(this);</p>                           </article>
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