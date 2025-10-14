"use client";

import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../../store";
import { closeModal } from "../../../../store/slices/modalSlice";
import { BaseModal } from "../../..";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const AuthModal = () => {
	const dispatch = useDispatch();
	const { isOpen, mode } = useSelector((state: rootState) => state.modal);

	if (!isOpen || !mode) return null;

	return (
		<BaseModal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
			{mode === "login" ? <LoginForm /> : <RegisterForm />}
		</BaseModal>
	);
};
