import React from "react";
import { get } from "lodash";
import { Breadcrumb, Icon } from "antd";
import moment from "moment";
import history from "../../history";

const styles = {
  container: {
    width: "70%",
    margin: "auto"
  },
  breadcrumb: {
    margin: "20px 0 20px 0"
  },
  content: {
    margin: "30px 0 30px 0"
  },
  backIcon: {
    fontSize: 60
  },
  backDiv: {
    display: "flex"
  },
  link: {
    color: "blue"
  }
};
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  navigateBackHandler = () => {
    history.push("/article");
  };
  render() {
    const article = get(this.props, "location.state", {});
    const imageUrl = `${article.urlToImage}`;
    const publishedAt = moment(article.publishedAt).format("DD MMMM YYYY");

    return (
      <div style={styles.container}>
        <div>
          <div>
            <Icon
              type="arrow-left"
              onClick={this.navigateBackHandler}
              style={styles.backIcon}
            />
          </div>
          {Object.keys(article).length > 0 && (
            <div>
              <h1>{article.title}</h1>
              <div style={styles.breadcrumb}>
                <Breadcrumb>
                  <Breadcrumb.Item>{publishedAt}</Breadcrumb.Item>
                  <Breadcrumb.Item>{article.author}</Breadcrumb.Item>
                  <Breadcrumb.Item>{article.source.name}</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href={article.url} style={styles.link}>
                      {article.url}
                    </a>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <img
                src={imageUrl}
                alt="NO Image Found"
                width="100%"
                height="400px"
              />
              <p style={styles.content}>{article.content}</p>
              <h3>Author:{article.author}</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Detail;
