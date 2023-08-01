interface TableProps {
  tableId: string;
  theadData: string[];
  tbodyData: any;
  tableColor: string;
  onClickShowArchiveNotes?: () => void;
}

export const Table: React.FC<TableProps> = ({
  tableId,
  theadData,
  tbodyData,
  tableColor,
  onClickShowArchiveNotes,
}) => {
  const showArchivedTableBtn = (
    <th onClick={onClickShowArchiveNotes} className="archiveNotes">
      <a href="#Archived">
        Archived
        <img
          src="./src/assets/lock-icon-grey.png"
          alt="archived-notes"
          className="archive-icon"
        />
        <span className="badge bg-secondary">click here</span>
      </a>
    </th>
  );

  return (
    <>
      <table
        id={tableId}
        className={`table table-striped ${tableColor} table-hover table-borderless`}
      >
        <thead>
          <tr className="table-dark">
            <th></th>
            {theadData?.map((item, index) =>
              item === "Archived" ? (
                showArchivedTableBtn
              ) : (
                <th key={index}>{item}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>{tbodyData}</tbody>
      </table>
    </>
  );
};
