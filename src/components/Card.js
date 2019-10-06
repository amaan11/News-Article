import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const styles = {
  card: {
    width: 350,
    height: 530,
    margin: "20px 0 20px 0"
  }
};
class CustomCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, description } = this.props;
    const imageUrl = `${this.props.imageUrl}`;

    return (
      <div>
        <Card
          hoverable
          style={styles.card}
          cover={<img alt="" src={imageUrl} height="200px" />}
        >
          <Meta title={title} description={description} />
        </Card>
      </div>
    );
  }
}

export default CustomCard;
