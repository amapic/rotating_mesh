import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";

export default var ItemList = React.createClass({
  render: function () {
    console.log(this.props);

    var items = this.props.data["items"].map(function (itemData) {
      const component = ({ ChildClass }) => {
        return <ChildClass />;
      };
      return React.createElement(component, {
        data: itemData,
        key: itemData["id"]
      });
    });
    console.log(items);
    return (
      <div className="list">
        <div>And I am an ItemList</div>
        <div>{items}</div>
      </div>
    );
  }
});
