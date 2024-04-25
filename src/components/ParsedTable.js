import { Table } from "antd";

const ParsedTable = ({ type, films, games }) => {
  return (
    <div className="upload-table">
      <Table
        pageSize={20}
        columns={[
          {
            title: '#',
            dataIndex: 'index',
          },
          {
            title: 'Нік',
            dataIndex: 'nick',
          },
          {
            title: type === 'films' ? 'Фільм' : 'Ігра',
            dataIndex: 'item',
          },
          {
            title: 'Поінти',
            dataIndex: 'point',
          },
        ]}
        dataSource={type === 'films' ? films : games}
      />
    </div>
  );
};

export default ParsedTable;
