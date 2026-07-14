import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading, error } = useMutation({
    mutationFn: signupApi,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
  });

  return { signup, isLoading, error };
}
