/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { NotificationType, NotificationHandler } from 'vscode-jsonrpc';

export interface WindowProgressClientCapabilities {
	/**
	 * Window specific client capabilities.
	 */
	window?: {
		/**
		 * Whether client supports handling progress notifications.
		 */
		progress?: boolean;
	}
}

export interface WindowProgressServerCapabilities {
	/**
	 * Window specific server capabilities.
	 */
	window?: {
		/**
		 * The requests for which the server will report progress (e.g. `textDocument/references`).
		 * The client might not hook a progress monitor / UI for requests which will not provide
		 * progress.
		 */
		progress?: string[];
	}
}

export interface ProgressStartParams {

	/**
	 * A unique identifier to associate multiple progress notifications with the same progress.
	 */
	id: string;

	/**
	 * Mandatory title of the progress operation. Used to briefly inform about
	 * the kind of operation being performed.
	 * Examples: "Indexing" or "Linking dependencies".
	 */
	title: string;

	/**
	 * Controls if a cancel button should show to allow the user to
	 * cancel the long running operation. Clients that don't support
	 * cancellation can ignore the setting.
	 */
	cancellable?: boolean;

	/**
	 * Optional, more detailed associated progress message. Contains
	 * complementary information to the `title`.
	 * Examples: "3/25 files", "project/src/module2", "node_modules/some_dep".
	 * If unset, the previous progress message (if any) is still valid.
	 */
	message?: string;

	/**
	 * Optional progress percentage to display(value 100 is considered 100%).
	 * If not provided infinite progress is assumed and clients are allowed
	 * to ignore the value in report notifications.
	 */
	percentage?: number;
}

/**
 * The `window/progressStart` notification is sent from the server to the client
 * to initiate a progress.
 */
export namespace ProgressStartNotification {
	export const type = new NotificationType<ProgressStartParams, void>('window/progressStart');
	export type HandlerSignature = NotificationHandler<ProgressStartParams>;
}

export interface ProgressReportParams {

	/**
	 * A unique identifier to associate multiple progress notifications with the same progress.
	 */
	id: string;

	/**
	 * Optional, more detailed associated progress message. Contains
	 * complementary information to the `title`.
	 * Examples: "3/25 files", "project/src/module2", "node_modules/some_dep".
	 * If unset, the previous progress message (if any) is still valid.
	 */
	message?: string;

	/**
	 * Optional progress percentage to display (value 100 is considered 100%).
	 * If unset, the previous progress percentage (if any) is still valid.
	 */
	percentage?: number;
}

/**
 * The `window/progressReport` notification is sent from the server to the client
 * to initiate a progress.
 */
export namespace ProgressReportNotification {
	export const type = new NotificationType<ProgressReportParams, void>('window/progressReport');
	export type HandlerSignature = NotificationHandler<ProgressReportParams>;
}

export interface ProgressDoneParams {
	/**
	 * A unique identifier to associate multiple progress notifications with the same progress.
	 */
	id: string;
}

/**
 * The `window/progressDone` notification is sent from the server to the client
 * to initiate a progress.
 */
export namespace ProgressDoneNotification {
	export const type = new NotificationType<ProgressDoneParams, void>('window/progressDone');
	export type HandlerSignature = NotificationHandler<ProgressDoneParams>;
}