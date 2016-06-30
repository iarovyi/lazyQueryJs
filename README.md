lazyQueryJs
===========

[lazyQueryJs](https://github.com/iarovyi/lazyQueryJs/blob/master/lazyQuery.js) is tiny plugin to jQuery
that allows you to write jQuery queries with lazy execution. 

 It can be very handy:
 
 * `Resuse` queries
 * Write `less` code
 
Sample
-------------------------

![alt tag](https://raw.github.com/iarovyi/lazyQueryJs/master/img/lazyQuerySample.png)

Everything between $.lazy() and .execute() is lazy executed.

1) Create query

```
var $query = $.lazy('#someId').width(400). ... .height(400);
```
2) Execute query

```
$query.execute();
```
  or execute with delay
```
$query.execute(4000);
```
  In case of execution with delay we receive jQuery deffered object so we can subscribe.

```
$query.execute(4000).then(function(){

});;
```

![alt tag](https://raw.github.com/iarovyi/lazyQueryJs/master/img/lazyQuerySample-wait.png)

TEST !!
