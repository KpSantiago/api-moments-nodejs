const express = require("express");

const routes = express.Router();

const Comments = require("../models/Comments");
const Moments = require("../models/Moments");

const upload = require("../uploads/config");

routes.get("/", (req, res) =>
	res.json({ hello: "world", message: "API REST iniciada" })
);

// ***************** MOMENTS *******************

routes.get("/api/moments", upload.array("image"), async (req, res) => {
	try {
		const moments = await Moments.findAll({
			include: { association: "comments" },
		});

		return res.status(200).json({
			message: "Requisição feita",
			data: moments,
		});
	} catch {
		return res.status(400).json({
			message: "not found",
			data: [],
		});
	}
});

routes.get("/api/moments/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const moments = await Moments.findOne({
			include: { association: "comments" },

			where: {
				id,
			},
		});

		return res.status(200).json({
			message: "Requisição feita",
			data: moments,
		});
	} catch {
		return res.status(400).json({
			message: "Momento não encontrado",
			data: [],
		});
	}
});

routes.post("/api/moments", upload.single("image"), async (req, res) => {
	try {
		const { title, description, updated_at } = req.body;

		const moments = await Moments.create({
			title: title,
			description: description,
			image: req.file.filename,
			updated_at,
		});

		return res.status(200).json({
			message: "Momento criado com sucesso!",
			data: moments,
		});
	} catch {
		return res.status(400).json({
			message: "Não foi possível criar o momento",
			data: [],
		});
	}
});

routes.delete("/api/moments/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const moments = await Moments.destroy({
			where: {
				id: id,
			},
		});

		return res.status(200).json({
			message: "Momento apagado com sucesso",
			data: moments,
		});
	} catch {
		return res.status(400).json({
			message: "Não foi possível apagar o momento",
			data: [],
		});
	}
});

routes.put("/api/moments/:id", upload.single("image"), async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description } = req.body;

		const moments = await Moments.update(
			{
				title,
				description,
				image: req.file.filename,
			},
			{
				where: {
					id: id,
				},
			}
		);

		return res.status(200).json({
			message: "Momento atualizado com sucesso!",
			data: moments,
		});
	} catch {
		return res.status(400).json({
			message: "Não foi possível atualizar o momento",
			data: [],
		});
	}
});

// ***************** COMMENTS *******************

routes.get("/api/:moment_id/comments", async (req, res) => {
	try {
		const { moment_id } = req.params;

		const comments = await Comments.findAll({
			where: { moment_id: moment_id },
		});

		return res.status(200).json({
			message: "Requisição feita",
			data: comments,
		});
	} catch {
		return res.status(400).json({
			message: "not found",
			data: [],
		});
	}
});

routes.post("/api/comments", async (req, res) => {
	try {
		const { username, text, moment_id } = req.body;

		const comments = await Comments.create({
			username,
			moment_id,
			text,
		});

		return res.status(200).json({
			message: "Comentário adicionado com sucesso!",
			data: comments,
		});
	} catch {
		return res.status(400).json({
			message: "Não foi possível adicionar o comentário",
			data: [],
		});
	}
});

routes.delete("/api/:id/comments/", async (req, res) => {
	try {
		const { id } = req.params;

		const comments = await Comments.destroy({ where: { id: id } });

		return res.status(200).json({
			message: "Comentário deletado com sucesso!",
			data: comments,
		});
	} catch {
		return res.status(400).json({
			message: "Não foi possível deletar o comentário",
			data: [],
		});
	}
});

module.exports = routes;
