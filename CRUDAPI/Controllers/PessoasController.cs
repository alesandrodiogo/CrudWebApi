using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto){
            _contexto = contexto;
        }
    //buscar pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> PegarTodosAsync(){
            return await _contexto.Pessoas.ToListAsync();
        }
    //buscar pessoa pelo id
        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> PegarPessoaPeloIdAsync(int pessoaId){
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
            if(pessoa == null)
            return NotFound();

            return pessoa;
        }
    //cadastrar pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarPessoaAsync(Pessoa pessoa){
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();

            return Ok();
        }
        //actualizar
        [HttpPut]
        public async Task<ActionResult> ActualizarPessoaAsync(Pessoa pessoa){
            _contexto.Pessoas.Update(pessoa);
            await _contexto.SaveChangesAsync();

            return Ok();
        }
        //Excluir registro
        [HttpDelete("{pessoaId}")]
        public async Task<ActionResult> ExcluirPessoaAsync(int pessoaId){
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
            if(pessoa == null)
            return NotFound();
            
            _contexto.Remove(pessoa);
           await _contexto.SaveChangesAsync();

           return Ok();
        }
    }
}