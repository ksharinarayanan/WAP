import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = (theme) => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        "& .ReactVirtualized__Table__headerRow": {
            flip: false,
            paddingRight:
                theme.direction === "rtl" ? "0 !important" : undefined,
        },
    },
    tableRow: {
        cursor: "pointer",
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: "initial",
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = (datakey, index) => {
        const key = datakey["dataKey"];
        let text;
        switch (key) {
            case "index":
                return datakey["rowIndex"];
            case "method":
                text = datakey["rowData"].request.method;
                break;
            case "hostname":
                text = datakey["rowData"].request.hostname;
                break;
            case "path":
                text = datakey["rowData"].request.path;
                break;
            case "statusCode":
                text = datakey["rowData"].response.statusCode;
                break;
            default:
                text = "Nothing here lol";
        }
        return text;
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{
                    height: headerHeight,
                    backgroundColor: "#000",
                    color: "#fff",
                    justifyContent: "center",
                }}
                align={columns[columnIndex].numeric || false ? "right" : "left"}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const {
            classes,
            columns,
            rowHeight,
            headerHeight,
            ...tableProps
        } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: "inherit",
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                        sortBy="index"
                        sortDirection="DESC"
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            const justify =
                                index === 0 || index === 4
                                    ? "center"
                                    : "flex-start";
                            const margin = index === 1 ? 20 : 0;
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={(datakey) => {
                                        return this.cellRenderer(
                                            datakey,
                                            index
                                        );
                                    }}
                                    style={{
                                        justifyContent: justify,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        marginLeft: margin,
                                    }}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

export default function ProxyTable({ rrPairs }) {
    rrPairs = rrPairs.reverse();

    return (
        <Paper style={{ height: 400, width: 1060 }}>
            <VirtualizedTable
                rowCount={rrPairs.length}
                rowGetter={({ index }) => rrPairs[index]}
                columns={[
                    {
                        width: 40,
                        label: "#",
                        dataKey: "index",
                    },
                    {
                        width: 120,
                        label: "METHOD",
                        dataKey: "method",
                    },
                    {
                        width: 300,
                        label: "HOST",
                        dataKey: "hostname",
                    },
                    {
                        width: 400,
                        label: "PATH",
                        dataKey: "path",
                    },
                    {
                        width: 200,
                        label: "STATUS CODE",
                        dataKey: "statusCode",
                    },
                ]}
            />
        </Paper>
    );
}

// end new code
