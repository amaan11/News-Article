import React from "react";
import { get, map } from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import Card from "../../components/Card";
import history from "../../history";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onNavigateDetailHandler = article => {
    history.push({
      pathname: `article/${article.title}`,
      state: article
    });
  };
  getTitleContent = article => {
    if (Object.keys(article).length > 0) {
      const publishedAt = moment(article.publishedAt).format("DD MMMM YYYY");

      return (
        <div>
          <div>{publishedAt}</div>
          <h2>{article.title.substring(0, 25)}</h2>
          <div>{article.author}</div>
        </div>
      );
    }
  };
  getDescriptionContent = article => {
    return (
      <div>
        <div>{article.description}</div>
        <Link to={article.source.name}>{article.source.name}</Link>
      </div>
    );
  };

  render() {
    const articles = get(this.props, "articles", []);
    const defaultImage = articles.length > 0 && articles[0].urlToImage; //Will be used if there is no image for that article

    return (
      <div className="d-flex flex-wrap ">
        {articles.length > 0 ? (
          map(articles, article => {
            const title = this.getTitleContent(article);
            const description = this.getDescriptionContent(article);

            return (
              <div onClick={() => this.onNavigateDetailHandler(article)}>
                <Card
                  imageUrl={
                    article.urlToImage ? article.urlToImage : defaultImage
                  }
                  title={title}
                  description={description}
                />
              </div>
            );
          })
        ) : (
          <h1 className="text-center">NO RESULTS FOUND!!!</h1>
        )}
      </div>
    );
  }
}

export default ArticleList;
