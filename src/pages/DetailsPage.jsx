import { useQuery } from "@tanstack/react-query";
import Loader from "components/modules/Loader";
import Details from "components/templates/detailsPage/Details";
import { useParams } from "react-router-dom";
import { getPostById } from "services/user";

function DetailsPage() {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["get-all-posts", id],
    queryFn: () => getPostById(id),
  });



  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <Details data={data} />
        </>
      )}
    </div>
  );
}

export default DetailsPage;
