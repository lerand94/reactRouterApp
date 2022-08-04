import {
  Link,
  Redirect,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import { Fragment, useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "./NotFound";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Maximilian", text: "Learning React is great!" },
];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    <p className="centered focused">{error}</p>;
  }
  if (!loadedQuote.text) {
    return <p>No qoute found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className="centered">
        <Route path={`${match.path}`} exact>
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </Route>
      </div>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
