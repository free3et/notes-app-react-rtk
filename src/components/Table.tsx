interface TableProps {
  tableId: string;
  theadData: string[];
  tbodyData: any[];
  tableColor: string;
}

export const Table: React.FC<TableProps> = ({
  tableId,
  theadData,
  tbodyData,
  tableColor,
}) => {
  return (
    <table
      id={tableId}
      className={`table table-striped ${tableColor} table-hover table-borderless`}
    >
      <thead>
        <tr className="table-dark">
          <th></th>
          {theadData?.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tbodyData}</tbody>
    </table>
  );
};
