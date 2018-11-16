import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Badge } from "antd";
import { fetchTestResult } from "./action";
import { NAME } from "./constant";
import Icon from "../components/icon";

const columns = [
  {
    title: "Test Runner ID",
    dataIndex: "udid",
    key: "udid",
    render: uuid => <NavLink to={`/${uuid}`}>{uuid}</NavLink>
  },
  {
    title: "Device",
    dataIndex: "device",
    key: "device",
    sorter: (a, b) => a.device.length - b.device.length
  },
  {
    title: "OS",
    dataIndex: "os",
    key: "os",
    sorter: (a, b) => a.os.length - b.os.length,
    render: (os, row) => (
      <div>
        <Icon type={os} size={18} /> {row.osVersion}
      </div>
    )
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
    render: total => (
      <Badge count={total} style={{ backgroundColor: "#8470ff" }} />
    )
  },
  {
    title: "Passed",
    key: "passed",
    dataIndex: "passed",
    sorter: (a, b) => a.passed - b.passed,
    render: passed => (
      <Badge count={passed} style={{ backgroundColor: "#228B22" }} />
    )
  },
  {
    title: "Failed",
    key: "failed",
    dataIndex: "failed",
    sorter: (a, b) => a.failed - b.failed,
    render: failed => <Badge count={failed} />
  }
];

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.fetchTestResult();
  }

  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.props.testResult} bordered />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testResult: state[NAME].testResult
});

const mapDispatchToProps = dispatch => ({
  fetchTestResult: () => dispatch(fetchTestResult())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
