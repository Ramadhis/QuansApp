import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Loading from "../widgets/Loading";
import { Link } from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getPopularQuans } from "../../actions/quansAction";

const Rightsidebar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [popu, setPopu] = useState(false);
  const pageId = searchParams.get("id");
  const { getPopularResult, getPopularLoading, getPopularError } = useSelector((state) => state.QuansReducer);
  // const items = Array.from(getPopularResult);
  useEffect(() => {
    dispatch(getPopularQuans());

    // setTimeout(() => {
    //   axios
    //     .get("http://localhost:5000/quans/popular")
    //     .then((response) => {
    //       setPopu(response.data);
    //       console.log(popu);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // }, 1000);
  }, [dispatch]);

  return (
    <div className="col-lg-3 mt-4 mt-md-1">
      <h5>Popular this Month</h5>

      <Card>
        <Card.Body>
          {console.log(searchParams.get("id"))}
          {getPopularResult ? (
            getPopularResult.length === 0 ? (
              <div className="text-center" style={{ fontSize: "15px" }}>
                data yang anda cari tidak ada
              </div>
            ) : (
              getPopularResult.map((popular, index) => {
                return popular.id == pageId ? (
                  <Card.Text className="my-1" style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {index + 1}. {popular.quans}.
                  </Card.Text>
                ) : (
                  <Link to={`/quans/?id=${popular.id}`}>
                    <Card.Text className="my-1" style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                      {index + 1}. {popular.quans}.
                    </Card.Text>
                  </Link>
                );
              })
            )
          ) : getPopularLoading ? (
            <Loading />
          ) : getPopularError ? (
            getPopularError
          ) : (
            <p>terjadi kesalahan</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Rightsidebar;
