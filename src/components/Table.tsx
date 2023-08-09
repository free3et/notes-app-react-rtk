import lockImg from "../assets/lock-icon-grey.png";

interface TableProps {
  tableId: string;
  theadData: string[];
  tbodyData: JSX.Element[];
  onClickShowArchiveNotes?: () => void;
}

export const Table: React.FC<TableProps> = ({
  tableId,
  theadData,
  tbodyData,
  onClickShowArchiveNotes,
}) => {
  const showArchivedTableBtn = (
    <th
      onClick={onClickShowArchiveNotes}
      className="archiveNotes flex justify-center items-center p-2 border border-slate-600"
    >
      <a href="#Archived" className="flex items-center space-x-2">
        <span>Archived</span>
        <img src={lockImg} alt="archived-notes" className="archive-icon" />
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
          click
        </span>
      </a>
    </th>
  );

  return (
    <div className="my-8 md:mt-3">
      <table
        id={tableId}
        className="w-full table-auto xs:text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg"
      >
        <thead className="bg-gray-800 text-white">
          <tr key={Date.now()}>
            <th className=" xs:hidden border border-slate-600 p-2"></th>
            {theadData?.map((item, index) =>
              item === "Archived" ? (
                showArchivedTableBtn
              ) : (
                <th key={index} className="border border-slate-600 p-2">
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>{tbodyData}</tbody>
      </table>
    </div>
  );
};
