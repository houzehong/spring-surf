var newsServiceUrl = "http://www.renewableenergyworld.com/rss/renews.rss";

var connector = remote.connect("http");
var re = /^http:\/\//;
if (!re.test(newsServiceUrl))
{
    newsServiceUrl = "http://" + newsServiceUrl;
}
var result = connector.call(newsServiceUrl);

if (result !== null)
{
    var rssXml = new String(result);
    var re = /<[r|R][s|S]{2}/; // Is this really an RSS document?
    if (re.test(rssXml))
    {
        // Strip out any preceding xml processing instructions or E4X will choke
        var idx = rssXml.search(re);
        rssXml = rssXml.substring(idx);

        // It looks we need to get rid of the trailing junk as well.
        if ( rssXml.indexOf('</rss>') != -1 ) {
            rssXml = rssXml.substring(0,rssXml.indexOf('</rss>')+6);
        }

        // Parse the xml document
        var rss = new XML(rssXml);
        model.title = rss.channel.title.toString();
        model.items = [];

        var item, obj;
        for each (item in rss.channel..item)
        {
            obj = {
                "title": item.title.toString(),
                "description": item.description.toString(),
                "link": item.link.toString()
            };

            model.items.push(obj);
        }

    }

}