interface TableProps {
  tableId: string;
  theadData: string[];
  tbodyData: any;
  tableColor: string;
}

export const Table: React.FC<TableProps> = ({
  tableId,
  theadData,
  tbodyData,
  tableColor,
}) => {
  return (
    <>
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
        <tbody>
          {tbodyData}
          {/* {tbodyData.length > 0 ? (
            tbodyData
          ) : (
            <tr>
              <td colSpan={Number("7")}>
                <h3 className="text-center text-info">You have no notes!</h3>
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </>
  );
};
