package com.project.amaris.note.api;


import com.project.amaris.note.dto.NoteDto;
import com.project.amaris.note.entity.Note;
import com.project.amaris.note.service.NoteServiceImp;
import com.project.amaris.util.ApiPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.NoteCtrl.CTRL)
public class NoteApi {


    @Autowired
    private NoteServiceImp noteService;

    @GetMapping("/search")
    public ResponseEntity<Page<NoteDto>> search(
            @PageableDefault(size =25, sort = "noteId", direction = Sort.Direction.ASC ) Pageable page) throws Exception {
        return new ResponseEntity<Page<NoteDto>>(noteService.search(page), new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<Boolean> save(@RequestBody Note note) throws Exception {
        return new ResponseEntity<Boolean>(noteService.save(note), new HttpHeaders(), HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Boolean> update(@RequestBody Note note) throws Exception {
        return new ResponseEntity<Boolean>(noteService.update(note), new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestBody Note note) throws Exception {
        return new ResponseEntity<Boolean>(noteService.delete(note), new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/findById")
    public ResponseEntity<NoteDto> findById(@RequestBody Note note) throws Exception {
        return new ResponseEntity<NoteDto>(noteService.findById(note), new HttpHeaders(), HttpStatus.OK);
    }
}
