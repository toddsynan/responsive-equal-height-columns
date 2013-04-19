/* Responsive Equal Height Columns
 * By: Todd Synan
 * Makes use of jQuery Throttle http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * Usage: $([selector]).equalCols([breakwidth(optional)]);
 * Place inside $(window).load() event for Chrome
 * Don't apply CSS transition to height of equalheight element
=============================================================== */$.fn.equalCols = function(breakwidth){
    var $cols = this,
        $colHeights = new Array([]),
        maxHeight,
        getMaxHeight;
        
        breakwidth = typeof breakwidth !== 'undefined' ? breakwidth : 0;
    
    /* builds array of column heights, returns largest
    -------------------------------------------------------*/
    getMaxHeight = function(h){
        
        var $thisCol = $(this);
        $thisCol.height('auto');
        var thisHeight = $thisCol.height();
        
        $colHeights[h] = thisHeight;
        maxHeight = Math.max.apply( Math, $colHeights );
        
        return maxHeight;
        
    };
    
    /* initial column height for each column
    -------------------------------------------------------*/
    $cols.height(getMaxHeight); 
    
    /* update column height on window resize
     * above breakpoint width
    -------------------------------------------------------*/
    function resizeAction() {
        if (window.innerWidth > breakwidth){
            $cols.height(getMaxHeight);
        } else {
            $cols.removeAttr('style');
        }
    }
    
    /* User jquery-throttle.js for debounce
     * http://benalman.com/code/projects/jquery-throttle-debounce/docs/files/jquery-ba-throttle-debounce-js.html
    ------------------------------------------------------------------*/
    $(window).resize($.throttle(250, resizeAction));
    
}; // end equalCols