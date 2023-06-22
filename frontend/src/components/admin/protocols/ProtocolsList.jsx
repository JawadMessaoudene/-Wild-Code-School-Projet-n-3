import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProtocolsList({
  protocol,
  selectedProtocol,
  setSelectedProtocol,
}) {
  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedProtocol(protocol.protocol_id);
    } else setSelectedProtocol("");
  };
  return (
    <li
      className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:hover:bg-gray-300"
      key={protocol.protocol_id}
    >
      <input
        type="checkbox"
        name={protocol.protocol_id}
        id={protocol.protocol_id}
        className="mr-2 lg:pl-4"
        checked={selectedProtocol === protocol.protocol_id}
        onChange={handleChange}
      />
      <Link
        to={`${protocol.protocol_id}`}
        className="flex h-full w-full items-center justify-between lg:pr-4"
      >
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {protocol.protocol_name}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {protocol.operation_name}
        </p>
      </Link>
    </li>
  );
}

ProtocolsList.propTypes = {
  protocol: PropTypes.shape().isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  setSelectedProtocol: PropTypes.shape().isRequired,
};
