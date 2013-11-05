<div class="dashlet">
    <div class="title" > ${title}</div>
    <div class="body scrollableList">
    <#if items?exists && items?size &gt; 0>
        <#list items as item>
            <div style="clear:both;"><a href="item.link">${item.title}</a></div>
            <div style="clear:both;">${item.description}</div>
        </#list>
    </#if>
    </div><#-- end of body -->
</div><#-- end of dashlet -->
