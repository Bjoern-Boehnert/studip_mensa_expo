import React, { FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface Props extends PropsWithChildren {
	key?: string;
}

export const ErrorBoundaryWrapper: FC<Props> = ({ children, key }) => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					key={key}
					onReset={reset}
					fallbackRender={({ error, resetErrorBoundary }) => (
						<ErrorFallback onPressRetry={resetErrorBoundary} error={error} />
					)}
				>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
};