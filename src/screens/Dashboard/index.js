import React from "react";
import { Button, Icon, DatePicker, AutoComplete } from "antd";
import { get, map } from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import FormField from "../../components/FormField";
import { fetchNewsArticleRequest } from "../../redux/action/dashboard";
import ArticleList from "../Article";

const styles = {
  container: {
    margin: "30px 80px 0 80px"
  },
  innerDiv: {
    display: "flex"
  },
  searchField: {
    width: "70%",
    marginRight: 100
  },
  filterBtn: {
    marginLeft: 190
  },
  filterDiv: {
    marginTop: 10
  },
  date: {
    marginBottom: 5
  }
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDiv: false,
      dataSource: []
    };
  }
  onAutoCompleteHandler = value => {
    const articles = get(this.props, "articles", []);
    const length = value.length;

    if (!value) {
      this.setState({
        dataSource: [],
        isFiltered: false
      });
      return;
    }

    if (articles.length > 0) {
      map(articles, article => {
        const author = article.author
          ? article.author.substring(0, length).toLowerCase()
          : null;

        const site = article.source.name
          ? article.source.name.substring(0, length).toLowerCase()
          : null;

        if (author && author === value) {
          this.setState({
            dataSource: [...this.state.dataSource, article.author]
          });
        }
        if (site && site === value) {
          this.setState({
            dataSource: [...this.state.dataSource, article.source.name]
          });
        }
      });
    }
  };

  onHandleDateChange = (date, dateString) => {
    const selecetedDate = moment(dateString).format("DD-MM-YYYY");
    const articles = get(this.props, "articles", []);
    let filteredArticle = [];

    filteredArticle = articles.filter(article => {
      return moment(article.publishedAt).format("DD-MM-YYYY") === selecetedDate;
    });
    this.setState({ isFiltered: true, filteredArticle: filteredArticle });
  };
  filterDivHandler = () => {
    this.setState({ filterDiv: true });
  };
  closeFilterDivHandler = () => {
    this.setState({ filterDiv: false });
  };
  onSearchHandler = searchQuery => {
    const articles = get(this.props, "articles", []);

    let searchResults = [];

    if (articles.length > 0) {
      map(articles, article => {
        const author = get(article, "author", null);
        const site = get(article, "source.name", null);
        if (
          (author && author == searchQuery) ||
          (site && site == searchQuery)
        ) {
          searchResults.push(article);
        }
      });
    }
    this.setState({ isFiltered: true, filteredArticle: searchResults });
  };

  getFilterOptions = () => {
    const articles = get(this.props, "articles", []);

    let sites = [];
    let authors = [];

    if (articles.length > 0) {
      map(articles, article => {
        const site = get(article, "source.name", null);
        const author = get(article, "author", null);
        if (site) {
          sites.push({ label: site, value: site });
        }
        if (author) {
          authors.push({ label: author, value: author });
        }
      });
    }
    return { sites, authors };
  };
  onFilterArticleHandler = (value, type) => {
    const articles = get(this.props, "articles", []);
    let filteredArticle = [];

    map(articles, article => {
      if (type === "author") {
        if (article.author == value) {
          filteredArticle.push(article);
        }
      } else {
        if (article.source.name == value) {
          filteredArticle.push(article);
        }
      }
    });
    this.setState({ isFiltered: true, filteredArticle: filteredArticle });
  };

  componentDidMount = () => {
    this.props.fetchNewsArticle();
  };

  render() {
    const { filterDiv, isFiltered, filteredArticle, dataSource } = this.state;
    let { articles, user } = this.props;
    const { sites, authors } = this.getFilterOptions();

    if (isFiltered) {
      articles = filteredArticle;
    }
    return (
      <div>
        <div style={styles.container}>
          <div style={styles.innerDiv}>
            <div style={styles.searchField}>
              <AutoComplete
                style={{ width: "120%" }}
                dataSource={dataSource}
                placeholder="Search Here..."
                onSearch={this.onAutoCompleteHandler}
                onSelect={this.onSearchHandler}
              />
            </div>
            <div style={styles.filterBtn}>
              <Button icon="filter" size="lg" onClick={this.filterDivHandler}>
                Filter
              </Button>
            </div>
          </div>
          {filterDiv && (
            <div className="border" style={styles.filterDiv}>
              <div className="d-flex container">
                <h3 className="m-10">FILTER</h3>
                <Icon type="close" onClick={this.closeFilterDivHandler} />
              </div>
              <div className="d-flex">
                <div className="label">
                  <div style={styles.date}>SELECT DATE</div>
                  <DatePicker onChange={this.onHandleDateChange} />
                </div>
                <div>
                  <div className="label">SELECT AUTHOR</div>
                  <FormField
                    type="Select"
                    option={authors}
                    placeholder="SELECT AUTHOR"
                    handleChange={value =>
                      this.onFilterArticleHandler(value, "author")
                    }
                  />
                </div>
                <div>
                  <div className="label">SELECT SITE</div>
                  <FormField
                    type="Select"
                    option={sites}
                    placeholder="SELECT SITE"
                    handleChange={value =>
                      this.onFilterArticleHandler(value, "site")
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <ArticleList articles={articles} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { articles } = state.dashboard;
  const { user } = state.auth;
  return {
    articles: articles,
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewsArticle: () => dispatch(fetchNewsArticleRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
