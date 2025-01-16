from newspaper import Article

def get_news(url):
    article = Article(url)
    article.download()
    article.parse()
    return article.text

