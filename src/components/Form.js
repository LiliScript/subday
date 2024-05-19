import { useState } from 'react';
import { Button, Form, Space, Upload, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file'

const getList = (rows) => {
  let list = [];

  rows.map(([nick, item, tier]) => list.push({
    nick, 
    item: item.toString(), 
    tier: [1, 2, 3].includes(tier) ? tier : 0,
    point: tier === 3 ? 6 : tier === 2 ? 2 : tier === 1 ? 1 : 0,
  }));

  list = list.filter(({ tier }) => [1, 2, 3].includes(tier)).map((item, index) => ({ ...item, index: index + 1 }))
  return list;
};

const UploadForm = ({ onChangeFilms, onChangeGames }) => {
  const [file, setFile] = useState(null);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file) => {
    setFile(file);
    return false;
  };

  const onReset = () => {
    if (!file) return;
    setFile([]);
  };

  const onParse = () => {
    if (!file) return;

    readXlsxFile(file, { sheet: 'Films' }).then((rows) => {
      const newFilmList = getList(rows);
      onChangeFilms(newFilmList);
    });

    readXlsxFile(file, { sheet: 'Games' }).then((rows) => {
      const newGamesList = getList(rows);
      onChangeGames(newGamesList);
    });
  };

  return (
    <div className="upload-table">
      <Form
        name="validate_other"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14, offset: 0 }}
      >
        <Form.Item>
          <Form.Item disable={!file} name="dragger" valuePropName="fileList" noStyle getValueFromEvent={normFile}>
            <Upload.Dragger name="files" multiple={false} beforeUpload={beforeUpload} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Тицяй, щоб обрати, або підтягуй сюди ексельку</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14 }}>
          <Space>
            <Button type="primary" htmlType="button" onClick={onParse}>
              Обробити
            </Button>
            <Button htmlType="reset" onClick={onReset}>Щось не те</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadForm;
