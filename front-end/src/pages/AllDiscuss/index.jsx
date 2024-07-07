import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Spin,
  Space,
  Button,
  Tooltip,
  message,
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./AllDiscuss.css";
import apiService from "../../service/api/api";
import DiscussModal from "../../components/Modais/CreateNewDiscuss";
import NewVote from "../../components/Modais/NewVote";
import { enumStatusMap } from "../../service/api/util/EnumStatus";

const AllDiscuss = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [voteValue, setVoteValue] = useState(null);
  const [discussId, setDiscussId] = useState();
  const [isVoteVisible, setIsVoteVisible] = useState(false);

  useEffect(() => {
    fetchDiscusses();
  }, []);

  const fetchDiscusses = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllDiscusses();
      setData(response.data);
    } catch (error) {
      message.error("Erro ao carregar as pautas");
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscuss = async (id) => {
    setLoading(true);
    try {
      await apiService.deleteDiscuss(id);
      fetchDiscusses();
    } catch (error) {
      console.error("Erro ao adicionar a pauta", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVote = async (values) => {
    console.log("Form Values:", values.associatedCpf);
    const vote = {
      associatedCpf: values.associatedCpf.replace(/\D/g, ''),
      vote: voteValue,
      discussId: discussId,
    };

    try {
      apiService.addVote(vote).then((response) =>{
        if (response.data === "ABLE_TO_VOTE") {
          message.success("Voto registrado com sucesso");
        } else if (response.data === "CPF_ALREADY_VOTED") {
          message.warning("Você já votou");
        } else if (response.data === "UNABLE_TO_VOTE") {
          message.error("Você não está habilitado a votar");
        } else if (response.data === "CPF_INVALID") {
          message.error("CPF Inválido");
        }
      })
      fetchDiscusses();
      setIsVoteVisible(false);
    } catch (error) {
      console.error("Erro ao votar na pauta", error);
      message.error("Erro ao votar na pauta");
    }
  };

  const handleAddDiscuss = async (values) => {
    console.log("Form Values:", values);

    const session = {
      duration: values.duration,
      status: 0,
    };

    const newDiscuss = {
      name: values.name,
      description: values.description,
      session: session,
    };

    try {
      await apiService.addDiscuss(newDiscuss);
      message.success("Pauta adicionada com sucesso");
      fetchDiscusses();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar a pauta", error);
      message.error("Erro ao adicionar a pauta");
    }
  };

  const handleVote = (value, discussId) => {
    console.log("discussId" + discussId);
    setVoteValue(value);
    setDiscussId(discussId);
    setIsVoteVisible(true);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return enumStatusMap[0];
      case 1:
        return enumStatusMap[1];
      case 2:
        return enumStatusMap[2];
      default:
        return "Status desconhecido";
    }
  };

  const columns = [
    {
      title: "Assunto da pauta",
      key: "name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Descrição da pauta",
      key: "description",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "session",
      width: "20%",
      render: (rowData) => {
        return renderStatus(rowData.status);
      },
    },
    {
      title: "Voto",
      align: "center",
      width: "15%",
      render: (rowData) => (
        <Space>
          <Tooltip title="Votar Sim">
            <Button
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => handleVote("sim", rowData.id)}
            />
          </Tooltip>
          <Tooltip title="Votar Não">
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => handleVote("não")}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      align: "center",
      width: "10%",
      render: (rowData) => (
        <Space>
          <Tooltip title="Deletar a pauta">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteDiscuss(rowData.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <Card
        title="Minha Lista"
        className="card"
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Pauta
          </Button>
        }
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            className="custom-table"
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={data}
          />
        )}
      </Card>

      <DiscussModal
        visible={isModalVisible}
        onCreate={handleAddDiscuss}
        onCancel={() => setIsModalVisible(false)}
      />

      {isVoteVisible && (
        <NewVote
          onCreate={handleAddVote}
          visible={isVoteVisible}
          onCancel={() => setIsVoteVisible(false)}
        />
      )}
    </div>
  );
};

export default AllDiscuss;
