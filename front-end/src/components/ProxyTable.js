import React from "react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import "@fontsource/inter";

export default class ProxyTable extends React.Component {
    constructor(props) {
        super(props);

        let list = this.addIndex(props.list);

        const sortBy = "index";
        const sortDirection = SortDirection.DESC;
        const sortedList = this._sortList({ sortBy, sortDirection, list });
        const count = 1;

        this.state = {
            sortBy,
            sortDirection,
            sortedList,
            list,
            count,
        };
    }

    addIndex = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (!list[i].index) list[i].index = i + 1;
        }
        return list;
    };

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.list.length !== this.props.list.length) {
            let list = this.addIndex(this.props.list);
            const sortBy = this.state.sortBy;
            const sortDirection = this.state.sortDirection;
            this.setState({
                ...this.state,
                list,
            });
            const sortedList = this._sortList({ sortBy, sortDirection, list });

            this.setState({
                ...this.state,
                sortedList,
            });
        }
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={30}
                            rowHeight={30}
                            sort={this._sort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            rowCount={this.state.sortedList.length}
                            rowGetter={({ index }) =>
                                this.state.sortedList[index]
                            }
                            headerStyle={{
                                fontWeight: 1000,
                                fontFamily: "cascadia code",
                                fontSize: 19,
                            }}
                            style={{
                                fontFamily: "inter",
                                fontWeight: 550,
                                fontSize: 16,
                            }}
                        >
                            <Column
                                label="#"
                                dataKey="index"
                                width={50}
                                cellDataGetter={(dataKey) => {
                                    return dataKey.rowData.index;
                                }}
                                defaultSortDirection="DESC"
                            />
                            <Column
                                label="METHOD"
                                dataKey="method"
                                width={100}
                                cellDataGetter={(dataKey) => {
                                    return dataKey.rowData.request.method;
                                }}
                                disableSort
                            />
                            <Column
                                width={350}
                                label="Host"
                                dataKey="hostname"
                                cellDataGetter={(dataKey) => {
                                    return dataKey.rowData.request.hostname;
                                }}
                                disableSort
                            />
                            <Column
                                width={500}
                                label="Path"
                                dataKey="path"
                                cellDataGetter={(dataKey) => {
                                    return dataKey.rowData.request.path;
                                }}
                                disableSort
                            />
                            <Column
                                label="STATUS"
                                dataKey="statusCode"
                                width={150}
                                cellDataGetter={(dataKey) => {
                                    return dataKey.rowData.response.statusCode;
                                }}
                                onClick={() => alert(1)}
                                disableSort
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }

    _sortList = ({ sortBy, sortDirection, list }) => {
        const state = this.state;
        let toSort;
        if (list === undefined) {
            toSort = state.list;
        } else
            toSort = state
                ? state.list.length > list.length
                    ? state.list
                    : list
                : list;

        let newList = _.sortBy(toSort, [sortBy]);
        if (sortDirection === SortDirection.DESC) {
            newList.reverse();
        }
        return newList;
    };

    _sort = ({ sortBy, sortDirection }) => {
        const sortedList = this._sortList({ sortBy, sortDirection });
        this.setState({ ...this.state, sortBy, sortDirection, sortedList });
    };
}