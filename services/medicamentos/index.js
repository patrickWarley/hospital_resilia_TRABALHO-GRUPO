const router = express.Router();

//create a router
router.get('/', (req, res) => {
  MedicamentoDAO.listMedicamentos()
    .then(medicamentos => res.json(medicamentos))
    .catch(err => console.log(err));
})

router.post('/', (req, res) => {
  const { medicamento } = req.body;

  MedicamentoDAO.createMedicamento(medicamento)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ mensagem: "Algum erro ocorreu!" });
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.getMedicamentoById(id)
    .then(medicamento => res.json(medicamento))
    .catch(err => {
      console.log(err)
      res.status(500).json({ mensagem: "Algum erro interno ocorreu!" })
    })
});

//del
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.deleteMedicamento(id)
    .then(result => res.status(200).json({ mensagem: "Medicamento excluido com sucesso!" }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Algum erro ocorreu tente novamente mais tarde!')
    });

});

//update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { medicamento } = req.body;

  MedicamentoDAO.updateMedicamento(id, medicamento)
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

export default router;