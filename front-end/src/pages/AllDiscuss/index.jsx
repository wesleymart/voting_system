import React, { useEffect, useState } from "react";
import { Card, Table, Spin, Space, Button, Tooltip, message } from "antd";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [searchStatus, setSearchStatus] = useState(0);
  const [totalDiscusses, setTotalDiscusses] = useState(0);

  useEffect(() => {
    fetchDiscusses(currentPage, searchStatus);
  }, [currentPage, searchStatus]);

  const fetchDiscusses = async (page, searchStatus) => {
    setLoading(true);
    try {
      const response = await apiService.getAllDiscusses(page, searchStatus);
      setData(response.data.content);
      setTotalDiscusses(response.data.totalElements);
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
      fetchDiscusses(currentPage, 0);
    } catch (error) {
      console.error("Erro ao deletar a pauta", error);
      message.error("Erro ao deletar a pauta");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVote = async (values) => {
    const vote = {
      associatedCpf: values.associatedCpf.replace(/\D/g, ""),
      vote: voteValue,
      discussId: discussId,
    };

    try {
      const response = await apiService.addVote(vote);
      const { data: responseData } = response;

      if (responseData === "ABLE_TO_VOTE") {
        message.success("Voto registrado com sucesso");
      } else if (responseData === "CPF_ALREADY_VOTED") {
        message.warning("Você já votou");
      } else if (responseData === "UNABLE_TO_VOTE") {
        message.error("Você não está habilitado a votar");
      } else if (responseData === "CPF_INVALID") {
        message.error("CPF Inválido");
      }

      fetchDiscusses(currentPage, 0);
      setIsVoteVisible(false);
    } catch (error) {
      console.error("Erro ao votar na pauta", error);
      message.error("Erro ao votar na pauta");
    }
  };

  const handleAddDiscuss = async (values) => {
    const newDiscuss = {
      name: values.name,
      description: values.description,
      session: {
        duration: values.duration,
        status: 0,
      },
    };

    try {
      await apiService.addDiscuss(newDiscuss);
      message.success("Pauta adicionada com sucesso");
      fetchDiscusses(currentPage, 0);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar a pauta", error);
      message.error("Erro ao adicionar a pauta");
    }
  };

  const handleVote = (value, discussId) => {
    setVoteValue(value);
    setDiscussId(discussId);
    setIsVoteVisible(true);
  };

  const renderStatus = (rowData) => {
    const status = rowData.session.status;
    const statusMessage = enumStatusMap[status] || "Status desconhecido";

    return status === 2
      ? `${statusMessage} ${resultOfDiscuss(rowData)}`
      : statusMessage;
  };

  const resultOfDiscuss = (rowData) => {
    if (rowData.totalVotesYes > rowData.totalVotesNo) {
      return "a pauta foi aprovada";
    } else if (rowData.totalVotesYes === rowData.totalVotesNo) {
      return "empate nos votos";
    } else {
      return "a pauta foi reprovada";
    }
  };

  const renderVote = (rowData) => {
    const isVoteDisabled = rowData.session.status === 2;
    return (
      <Space>
        <Tooltip title="Votar Sim">
          <Button
            shape="circle"
            icon={<CheckOutlined />}
            disabled={isVoteDisabled}
            onClick={() => handleVote("sim", rowData.id)}
          />
          {isVoteDisabled && (
            <span style={{ marginLeft: 8 }}>{rowData.totalVotesYes}</span>
          )}
        </Tooltip>
        <Tooltip title="Votar Não">
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            disabled={isVoteDisabled}
            onClick={() => handleVote("não", rowData.id)}
          />
          {isVoteDisabled && (
            <span style={{ marginLeft: 8 }}>{rowData.totalVotesNo}</span>
          )}
        </Tooltip>
      </Space>
    );
  };

  const getUniqueStatus = (data) => {
    const statusSet = new Set();
    statusSet.add(0)
    data.map(item => statusSet.add(item.session.status))
    return Array.from(statusSet);
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
      filters: getUniqueStatus(data).map((status) => ({
        text: status === 0 ? "Limpar filtro" : enumStatusMap[status],
        value: status,
      })),
      width: "20%",
      render: (rowData) => renderStatus(rowData),
    },
    {
      title: "Voto",
      align: "center",
      width: "15%",
      render: (rowData) => renderVote(rowData),
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

  const handleTableChange = (pagination, filters) => {
    setSearchStatus(filters.status === undefined || filters.status === null? 0 : filters.status);
    setCurrentPage(
      pagination.current === undefined ? 0 : pagination.current - 1
    );
  };

  return (
    <div className="container">
      <Card
        title="Pautas"
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
            onChange={handleTableChange}
            columns={columns}
            dataSource={data}
            pagination={{
              current: currentPage + 1,
              pageSize: 10,
              total: totalDiscusses,
            }}
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
