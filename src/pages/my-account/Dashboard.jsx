import {
  FiFileText,
  FiDownload,
  FiUser,
  FiLogOut,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    label: "Orders",
    description: "View and track your recent orders",
    icon: FiFileText,
    path: "/my-account/orders",
  },
  {
    label: "Downloads",
    description: "Access your purchased downloads",
    icon: FiDownload,
    path: "/my-account/downloads",
  },
  {
    label: "Account Settings",
    description: "Update your password and profile",
    icon: FiUser,
    path: "/my-account/account-details",
  },
  {
    label: "Logout",
    description: "Securely sign out of your account",
    icon: FiLogOut,
    path: "logout",
    danger: true,
  },
];

export default function Dashboard({ openLogin }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleCardClick = (card) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    if (card.path === "logout") {
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    navigate(card.path);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-2">
          Manage your account, orders and downloads from here.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.label}
              onClick={() => handleCardClick(card)}
              className={`
                group relative
                bg-white border border-gray-200
                rounded-xl p-6
                text-left
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
                ${card.danger ? "hover:border-red-300" : ""}
              `}
            >

              {/* Icon Badge */}
              <div
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  transition
                  ${
                    card.danger
                      ? "bg-red-50 text-red-500 group-hover:bg-red-100"
                      : "bg-gray-100 text-gray-600 group-hover:bg-black group-hover:text-white"
                  }
                `}
              >
                <Icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold mb-1">
                {card.label}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500">
                {card.description}
              </p>

              {/* Arrow */}
              <div className="absolute top-6 right-6 text-gray-300 group-hover:text-black transition">
                <FiArrowRight size={16} />
              </div>

            </button>
          );
        })}

      </div>
    </div>
  );
}
